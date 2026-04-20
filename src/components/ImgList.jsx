import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import '../css/ImgList.css';

// Spring Boot 서버 주소 상수로 관리
const API_BASE = 'http://localhost:8080';

export default function ImgList() {
  // receipts: 서버에서 불러온 영수증 목록 { id, name, url, createdAt }
  const [receipts, setReceipts] = useState([]);
  // selected: 현재 미리보기 중인 영수증 (클릭 시 오른쪽 미리보기에 표시)
  const [selected, setSelected] = useState(null);
  // isConverting: PDF 변환 중 여부 (버튼 중복 클릭 방지)
  const [isConverting, setIsConverting] = useState(false);

  // 컴포넌트 마운트 시 서버에서 이미지 목록 불러오기
  useEffect(() => {
    fetch(`${API_BASE}/api/images`)
      .then((res) => res.json())
      .then(setReceipts) // 응답 데이터를 바로 receipts state에 저장
      .catch(console.error);
  }, []); // [] : 최초 1회만 실행

  // 이미지 목록 → PDF 변환 후 다운로드
  const handleSavePDF = async () => {
    if (!receipts.length) return alert('저장할 이미지가 없습니다.');
    setIsConverting(true);

    try {
      // jsPDF 인스턴스 생성 - A4 세로, mm 단위
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      const PAGE_W = 210; // A4 가로 (mm)
      const PAGE_H = 297; // A4 세로 (mm)
      const MARGIN = 10; // 여백 (mm)

      for (let i = 0; i < receipts.length; i++) {
        // 두 번째 이미지부터 새 페이지 추가 (첫 번째는 이미 빈 페이지가 있음)
        if (i > 0) pdf.addPage();

        // 이미지 로드는 비동기라 Promise로 감싸서 await 처리
        await new Promise((resolve) => {
          const img = new Image();
          // crossOrigin 설정 - 다른 포트(8080)의 이미지를 canvas에 그리기 위해 필요
          // 없으면 CORS 에러로 PDF에 이미지가 안 들어감
          img.crossOrigin = 'anonymous';

          img.onload = () => {
            // 원본 비율 유지하면서 A4에 맞게 크기 계산
            const ratio = img.width / img.height;
            let w = PAGE_W - MARGIN * 2; // 여백 제외한 최대 가로
            let h = w / ratio; // 비율에 맞는 세로

            // 세로가 페이지를 넘으면 세로 기준으로 재계산
            if (h > PAGE_H - MARGIN * 2) {
              h = PAGE_H - MARGIN * 2;
              w = h * ratio;
            }

            // 가로 중앙 정렬 계산
            const x = (PAGE_W - w) / 2;

            // PDF에 이미지 추가 (이미지, 형식, x, y, 가로, 세로)
            pdf.addImage(img, 'JPEG', x, MARGIN, w, h);
            resolve(); // Promise 완료 → 다음 이미지로
          };

          // 서버의 이미지 URL로 로드 (API_BASE + /uploads/uuid.jpg)
          img.src = `${API_BASE}${receipts[i].url}`;
        });
      }

      // 모든 페이지 추가 완료 후 PDF 다운로드
      pdf.save('영수증_모음.pdf');
    } catch (err) {
      alert('PDF 변환 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="imglist-container">
      <h2 className="imglist-title">📋 영수증 목록</h2>

      {/* 목록이 비었을 때 안내 문구 */}
      {receipts.length === 0 ? (
        <p className="imglist-empty">저장된 이미지가 없습니다.</p>
      ) : (
        <>
          {/* 상단 액션 바 - 총 장 수 + PDF 저장 버튼 */}
          <div className="imglist-actions">
            <span>{receipts.length}장</span>
            {/* isConverting 중일 때 버튼 비활성화로 중복 클릭 방지 */}
            <button
              className="imglist-pdf-btn"
              onClick={handleSavePDF}
              disabled={isConverting}
            >
              {isConverting ? '변환 중...' : '📄 PDF로 저장'}
            </button>
          </div>

          {/* 좌우 레이아웃 - 왼쪽 목록 / 오른쪽 미리보기 */}
          <div className="imglist-layout">
            {/* 왼쪽: 썸네일 리스트 */}
            <div className="imglist-list">
              {receipts.map((r) => (
                <div
                  key={r.id}
                  // 클릭한 항목이 selected와 같으면 active 클래스 추가 (파란 테두리)
                  className={`imglist-item ${selected?.id === r.id ? 'active' : ''}`}
                  onClick={() => setSelected(r)} // 클릭 시 selected 변경 → 오른쪽 미리보기 업데이트
                >
                  {/* 썸네일 이미지 - 서버 URL로 직접 로드 */}
                  <img
                    src={`${API_BASE}${r.url}`}
                    alt={r.name}
                    className="imglist-thumb"
                  />
                  <div className="imglist-info">
                    <p className="imglist-name">{r.name}</p>
                    {/* ISO 날짜 문자열을 한국 날짜 형식으로 변환 */}
                    <p className="imglist-date">
                      {new Date(r.createdAt).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 오른쪽: 미리보기 영역 */}
            <div className="imglist-preview">
              {selected ? (
                // selected가 있으면 해당 이미지 크게 표시
                <>
                  <p className="imglist-preview-name">{selected.name}</p>
                  <img
                    src={`${API_BASE}${selected.url}`}
                    alt={selected.name}
                    className="imglist-preview-img"
                  />
                </>
              ) : (
                // selected가 없으면 안내 문구
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
