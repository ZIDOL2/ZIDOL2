import { useCallback, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// react-pdf: PDF 파일을 브라우저에서 렌더링하는 라이브러리
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './css/App.css';
import PutImg from './components/PutImg';
import ImgList from './components/ImgList';

// PDF.js 워커 설정 - PDF 파싱을 별도 스레드(워커)에서 처리해서 UI 블로킹 방지
// public 폴더에 pdf.worker.min.mjs 파일이 있어야 함
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

// =============================================
// 기존 App 내용을 ReceiptPdf 컴포넌트로 분리
// App은 라우터 역할만 하도록 구조 변경
// =============================================
function ReceiptPdf() {
  // PDF 파일 객체
  const [file, setFile] = useState(null);
  // PDF 총 페이지 수
  const [numPages, setNumPages] = useState(null);
  // 드래그 중 여부 (드롭존 스타일 변경용)
  const [isDragging, setIsDragging] = useState(false);
  // 변환 중 여부 (이미지/엑셀 다운로드 중복 클릭 방지)
  const [isConverting, setIsConverting] = useState(false);

  // PDF 파일만 허용하는 파일 처리 함수
  const handleFile = (selected) => {
    if (selected?.type === 'application/pdf') {
      setFile(selected);
      setNumPages(null); // 새 파일 선택 시 페이지 수 초기화
    } else {
      alert('PDF 파일만 선택해 주세요!');
    }
  };

  // input[type=file] onChange 핸들러
  const onFileChange = (e) => handleFile(e.target.files[0]);

  // 드래그 진입 - 드롭존 스타일 변경
  const onDragOver = useCallback((e) => {
    e.preventDefault(); // 브라우저 기본 동작 방지
    setIsDragging(true);
  }, []);

  // 드래그 벗어남 - 스타일 원복
  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  // 드롭 - 파일 추출해서 handleFile로 전달
  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]); // 드롭한 첫 번째 파일만 사용
  }, []);

  // PDF 로드 완료 시 총 페이지 수 저장
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // 서버에 PDF 파일 저장 (기존 /api/upload 엔드포인트)
  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('receipt', file);
    await fetch('/api/upload', { method: 'POST', body: formData });
    alert('저장 완료!');
  };

  // PDF → 페이지별 PNG 이미지로 변환 후 다운로드
  const handleDownloadImages = async () => {
    if (!file || !numPages) return;
    setIsConverting(true);
    try {
      // File 객체를 ArrayBuffer로 변환 후 PDF.js로 파싱
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await pdfjs.getDocument({ data: arrayBuffer }).promise;

      for (let i = 1; i <= pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i);
        // scale: 2.0 = 2배 해상도 (높을수록 고화질, 파일 크기 증가)
        const viewport = page.getViewport({ scale: 2.0 });

        // canvas에 페이지 렌더링
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');

        // 흰 배경 설정 (PNG 투명 배경 방지)
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        await page.render({ canvasContext: ctx, viewport }).promise;

        // canvas → PNG 변환 후 자동 다운로드
        const link = document.createElement('a');
        link.download = `${file.name.replace('.pdf', '')}_${i}페이지.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        // 페이지 간 딜레이 - 브라우저 다운로드 충돌 방지
        await new Promise((res) => setTimeout(res, 300));
      }
    } catch (err) {
      alert('이미지 변환 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setIsConverting(false);
    }
  };

  // PDF → 엑셀 변환 후 다운로드
  // 각 페이지를 이미지로 변환해서 엑셀 시트에 세로로 삽입
  const handleDownloadExcel = async () => {
    if (!file || !numPages) return;
    setIsConverting(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await pdfjs.getDocument({ data: arrayBuffer }).promise;

      // ExcelJS 동적 import (필요할 때만 로드해서 초기 번들 크기 절약)
      const ExcelJS = (await import('exceljs')).default;
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet('영수증');

      let currentRow = 1; // 현재 이미지 삽입 시작 행

      for (let i = 1; i <= pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 });

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport }).promise;

        // canvas → base64 변환 (ExcelJS는 base64로 이미지 삽입)
        const base64 = canvas.toDataURL('image/png').split(',')[1];

        // 실제 표시 크기 (scale 2.0이라 원본의 절반으로 조정)
        const imgWidth = viewport.width / 2;
        const imgHeight = viewport.height / 2;

        const imageId = workbook.addImage({ base64, extension: 'png' });

        // 시트에 이미지 삽입 (tl: top-left 위치, ext: 크기)
        sheet.addImage(imageId, {
          tl: { col: 0, row: currentRow - 1 },
          ext: { width: imgWidth, height: imgHeight },
        });

        // 이미지 높이에 맞게 행 높이 설정 (행 1개 = 20px 기준)
        const rowCount = Math.ceil(imgHeight / 20);
        for (let r = currentRow; r < currentRow + rowCount; r++) {
          sheet.getRow(r).height = 20;
        }

        // 다음 이미지 삽입 위치 (현재 이미지 높이 + 간격 2행)
        currentRow += rowCount + 2;
      }

      sheet.getColumn(1).width = 100; // A열 너비 설정

      // 엑셀 파일 생성 후 다운로드
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${file.name.replace('.pdf', '')}_영수증.xlsx`;
      link.click();
    } catch (err) {
      alert('엑셀 변환 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="container">
      <h2 className="title">영수증 첨부</h2>

      {/* 파일 업로드 + 드래그앤드롭 영역 */}
      <div
        className={`uploadBox ${isDragging ? 'dragging' : ''}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {/* input은 숨기고 label로 클릭 이벤트 연결 */}
        <input
          type="file"
          accept=".pdf"
          onChange={onFileChange}
          id="file-upload"
          className="fileInput"
        />
        <label htmlFor="file-upload" className="uploadLabel">
          {file
            ? `선택된 파일: ${file.name}`
            : isDragging
              ? '여기에 놓으세요!'
              : '클릭하거나 PDF 파일을 여기에 드래그하세요'}
        </label>
      </div>

      {/* 버튼 영역 */}
      <div className="buttonGroup">
        <button onClick={handleUpload} disabled={!file} className="button">
          저장
        </button>
        <button
          onClick={handleDownloadImages}
          disabled={!file || isConverting}
          className="buttonDownload"
        >
          {isConverting ? '변환 중...' : '이미지로 다운로드'}
        </button>
        <button
          onClick={handleDownloadExcel}
          disabled={!file || isConverting}
          className="buttonExcel"
        >
          {isConverting ? '변환 중...' : '엑셀로 다운로드'}
        </button>
      </div>

      {/* PDF 전체 페이지 미리보기 - 파일 선택 시에만 렌더링 */}
      {file && (
        <div className="previewContainer">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<p className="loading">PDF를 불러오는 중...</p>}
          >
            {/* numPages만큼 Page 컴포넌트 생성 */}
            {numPages &&
              Array.from({ length: numPages }, (_, i) => (
                <div key={`page_${i + 1}`} className="pageWrapper">
                  <Page
                    pageNumber={i + 1}
                    width={500}
                    renderTextLayer={false} // 텍스트 레이어 비활성화 (불필요)
                    renderAnnotationLayer={false} // 주석 레이어 비활성화 (불필요)
                  />
                  <p className="pageInfo">
                    {i + 1} / {numPages} 페이지
                  </p>
                </div>
              ))}
          </Document>
        </div>
      )}

      {/* 파일 미선택 시 placeholder */}
      {!file && (
        <div className="placeholder">
          파일을 업로드하면 여기에 미리보기가 표시됩니다.
        </div>
      )}
    </div>
  );
}

// =============================================
// App 컴포넌트 - 라우터 역할만 담당
// =============================================
function App() {
  return (
    // BrowserRouter: HTML5 History API 기반 라우터
    <BrowserRouter>
      {/* 상단 네비게이션 - 모든 페이지에서 공통으로 표시 */}
      <nav className="nav">
        <Link to="/">📄 PDF 뷰어</Link>
        <Link to="/upload">📎 이미지 업로드</Link>
        <Link to="/list">📋 영수증 목록</Link>
      </nav>

      {/* Routes: URL에 따라 컴포넌트 전환 */}
      <Routes>
        <Route path="/" element={<ReceiptPdf />} /> {/* 기존 PDF 뷰어 */}
        <Route path="/upload" element={<PutImg />} /> {/* 이미지 업로드 */}
        <Route path="/list" element={<ImgList />} /> {/* 영수증 목록 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
