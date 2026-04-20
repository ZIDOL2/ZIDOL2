'use client';

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import jsPDF from 'jspdf';
import '../css/ImgList.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const API_BASE = 'http://localhost:8080';

interface Receipt {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'pdf';
  createdAt: string;
}

export default function ImgList() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [selected, setSelected] = useState<Receipt | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/images`)
      .then((res) => res.json())
      .then((data: Receipt[]) => setReceipts(data))
      .catch(console.error);
  }, []);

  const handleSelect = (r: Receipt) => {
    setSelected(r);
    setNumPages(null);
  };

  // 이미지만 필터링해서 PDF로 변환
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
        if (i > 0) pdf.addPage();
        await new Promise<void>((resolve) => {
          const img = new window.Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            const ratio = img.width / img.height;
            let w = PAGE_W - MARGIN * 2;
            let h = w / ratio;
            if (h > PAGE_H - MARGIN * 2) {
              h = PAGE_H - MARGIN * 2;
              w = h * ratio;
            }
            const x = (PAGE_W - w) / 2;
            pdf.addImage(img, 'JPEG', x, MARGIN, w, h);
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
    e.stopPropagation(); // 클릭 이벤트 부모로 전파 방지
    if (!window.confirm('삭제할까요?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/images/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('삭제 실패');
      // 목록에서 제거
      setReceipts((prev) => prev.filter((r) => r.id !== id));
      // 선택된 항목이면 미리보기 초기화
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
            {/* 왼쪽: 썸네일 목록 */}
            <div className="imglist-list">
              {receipts.map((r) => (
                <div
                  key={r.id}
                  className={`imglist-item ${selected?.id === r.id ? 'active' : ''}`}
                  onClick={() => handleSelect(r)}
                >
                  {/* 타입에 따라 썸네일 분기 */}
                  {r.type === 'pdf' ? (
                    // PDF는 아이콘으로 표시
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '6px',
                        background: '#e8eaf6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        flexShrink: 0,
                      }}
                    >
                      📄
                    </div>
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={`${API_BASE}${r.url}`}
                      alt={r.name}
                      className="imglist-thumb"
                    />
                  )}
                  <div className="imglist-info">
                    <p className="imglist-name">{r.name}</p>
                    <p className="imglist-date">
                      {new Date(r.createdAt).toLocaleDateString('ko-KR')}
                    </p>
                  </div>

                  {/* 삭제 버튼 */}
                  <button
                    className="imglist-delete-btn"
                    onClick={(e) => handleDelete(r.id, e)}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            {/* 오른쪽: 미리보기 */}
            <div className="imglist-preview">
              {selected ? (
                <>
                  <p className="imglist-preview-name">{selected.name}</p>

                  {selected.type === 'pdf' ? (
                    // PDF 미리보기 + 다운로드/프린트 버튼
                    <div style={{ width: '100%' }}>
                      {/* 다운로드 / 프린트 버튼 */}
                      <div
                        style={{
                          display: 'flex',
                          gap: '10px',
                          marginBottom: '16px',
                        }}
                      >
                        <a
                          href={`${API_BASE}${selected.url}`}
                          download={selected.name}
                          style={{
                            padding: '8px 16px',
                            background: '#3F51B5',
                            color: '#FAFAFE',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          ⬇️ 다운로드
                        </a>
                        <button
                          onClick={() => {
                            // 새 탭에서 PDF 열고 프린트 다이얼로그 실행
                            const printWindow = window.open(
                              `${API_BASE}${selected.url}`,
                              '_blank',
                            );
                            printWindow?.addEventListener('load', () =>
                              printWindow.print(),
                            );
                          }}
                          style={{
                            padding: '8px 16px',
                            background: '#5c6bc0',
                            color: '#FAFAFE',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          🖨️ 프린트
                        </button>
                      </div>

                      {/* PDF 페이지 미리보기 */}
                      <Document
                        file={`${API_BASE}${selected.url}`}
                        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                        loading={
                          <p style={{ color: '#9fa8da' }}>PDF 불러오는 중...</p>
                        }
                      >
                        {numPages &&
                          Array.from({ length: numPages }, (_, i) => (
                            <div
                              key={`page_${i + 1}`}
                              style={{
                                marginBottom: '12px',
                                textAlign: 'center',
                              }}
                            >
                              <Page
                                pageNumber={i + 1}
                                width={400}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                              />
                              <p
                                style={{
                                  fontSize: '12px',
                                  color: '#5c6bc0',
                                  marginTop: '4px',
                                }}
                              >
                                {i + 1} / {numPages} 페이지
                              </p>
                            </div>
                          ))}
                      </Document>
                    </div>
                  ) : (
                    // 이미지 미리보기
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={`${API_BASE}${selected.url}`}
                      alt={selected.name}
                      className="imglist-preview-img"
                    />
                  )}
                </>
              ) : (
                <p className="imglist-preview-placeholder">
                  왼쪽 목록에서 이미지를 클릭하면 미리보기가 표시됩니다.
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
