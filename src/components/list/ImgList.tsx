'use client';

import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import type { Receipt } from '@/types/receipt';
import ThumbnailItem from './ThumbnailItem';
import PreviewPanel from './PreviewPanel';
import '../../css/ImgList.css';

const API_BASE = 'http://localhost:8080';

// 영수증 목록 메인 컴포넌트
// 서버에서 목록 불러오기 / 삭제 / PDF 변환 담당
// 렌더링은 ThumbnailItem, PreviewPanel 컴포넌트에 위임
export default function ImgList() {
  const [receipts, setReceipts] = useState<Receipt[]>([]); // 전체 영수증 목록
  const [selected, setSelected] = useState<Receipt | null>(null); // 현재 선택된 영수증
  const [isConverting, setIsConverting] = useState(false); // PDF 변환 중 여부

  // 마운트 시 서버에서 목록 불러오기
  useEffect(() => {
    fetch(`${API_BASE}/api/images`)
      .then((res) => res.json())
      .then((data: Receipt[]) => setReceipts(data))
      .catch(console.error);
  }, []); // [] → 최초 1회만 실행

  // 항목 선택
  const handleSelect = (r: Receipt) => setSelected(r);

  // 이미지만 필터링해서 A4 PDF로 변환 후 다운로드
  const handleSavePDF = async () => {
    // PDF 타입 제외하고 이미지만 변환
    const imageReceipts = receipts.filter((r) => r.type === 'image');
    if (!imageReceipts.length) return alert('저장된 이미지가 없습니다.');
    setIsConverting(true);
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      const PAGE_W = 210,
        PAGE_H = 297,
        MARGIN = 10;

      for (let i = 0; i < imageReceipts.length; i++) {
        if (i > 0) pdf.addPage(); // 두 번째부터 새 페이지

        // 이미지 로드는 비동기 → Promise로 감싸서 await 처리
        await new Promise<void>((resolve) => {
          // window.Image() 사용 - Next.js Image 컴포넌트와 충돌 방지
          const img = new window.Image();
          img.crossOrigin = 'anonymous'; // 다른 포트(8080) 이미지 CORS 대응
          img.onload = () => {
            // 원본 비율 유지하며 A4에 맞게 크기 계산
            const ratio = img.width / img.height;
            let w = PAGE_W - MARGIN * 2;
            let h = w / ratio;
            if (h > PAGE_H - MARGIN * 2) {
              h = PAGE_H - MARGIN * 2;
              w = h * ratio;
            }
            // 가로 중앙 정렬
            pdf.addImage(img, 'JPEG', (PAGE_W - w) / 2, MARGIN, w, h);
            resolve();
          };
          img.src = `${API_BASE}${imageReceipts[i].url}`;
        });
      }
      pdf.save('영수증_모음.pdf');
    } catch (err) {
      alert('PDF 변환 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setIsConverting(false);
    }
  };

  // 개별 삭제
  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 onClick(선택) 이벤트 전파 방지
    if (!window.confirm('삭제할까요?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/images/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('삭제 실패');
      // 목록에서 제거
      setReceipts((prev) => prev.filter((r) => r.id !== id));
      // 삭제된 항목이 선택 중이면 미리보기 초기화
      if (selected?.id === id) setSelected(null);
    } catch (err) {
      alert('삭제 중 오류가 발생했습니다.');
      console.error(err);
    }
  };

  return (
    <div className="imglist-container">
      <h2 className="imglist-title">📋 영수증 목록</h2>

      {receipts.length === 0 ? (
        <p className="imglist-empty">저장된 이미지가 없습니다.</p>
      ) : (
        <>
          {/* 상단 액션바 - 총 개수 + PDF 저장 버튼 */}
          <div className="imglist-actions">
            <span>{receipts.length}개</span>
            <button
              className="imglist-pdf-btn"
              onClick={handleSavePDF}
              disabled={isConverting}
            >
              {isConverting ? '변환 중...' : '📄 PDF로 저장'}
            </button>
          </div>

          <div className="imglist-layout">
            {/* 왼쪽: 썸네일 목록
                각 항목을 ThumbnailItem 컴포넌트로 렌더링 */}
            <div className="imglist-list">
              {receipts.map((r) => (
                <ThumbnailItem
                  key={r.id}
                  receipt={r}
                  isSelected={selected?.id === r.id}
                  apiBase={API_BASE}
                  onSelect={handleSelect}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {/* 오른쪽: 미리보기
                PreviewPanel 컴포넌트에 선택된 항목 전달 */}
            <PreviewPanel selected={selected} apiBase={API_BASE} />
          </div>
        </>
      )}
    </div>
  );
}
