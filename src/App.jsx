import { useCallback, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './css/App.css';
import PutImg from './components/PutImg';
import ImgList from './components/ImgList';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

// 기존 App 내용을 ReceiptPdf 컴포넌트로 분리
function ReceiptPdf() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  const handleFile = (selected) => {
    if (selected?.type === 'application/pdf') {
      setFile(selected);
      setNumPages(null);
    } else {
      alert('PDF 파일만 선택해 주세요!');
    }
  };

  const onFileChange = (e) => handleFile(e.target.files[0]);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('receipt', file);
    await fetch('/api/upload', { method: 'POST', body: formData });
    alert('저장 완료!');
  };

  const handleDownloadImages = async () => {
    if (!file || !numPages) return;
    setIsConverting(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await pdfjs.getDocument({ data: arrayBuffer }).promise;
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
        const link = document.createElement('a');
        link.download = `${file.name.replace('.pdf', '')}_${i}페이지.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        await new Promise((res) => setTimeout(res, 300));
      }
    } catch (err) {
      alert('이미지 변환 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownloadExcel = async () => {
    if (!file || !numPages) return;
    setIsConverting(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const ExcelJS = (await import('exceljs')).default;
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet('영수증');
      let currentRow = 1;
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
        const base64 = canvas.toDataURL('image/png').split(',')[1];
        const imgWidth = viewport.width / 2;
        const imgHeight = viewport.height / 2;
        const imageId = workbook.addImage({ base64, extension: 'png' });
        sheet.addImage(imageId, {
          tl: { col: 0, row: currentRow - 1 },
          ext: { width: imgWidth, height: imgHeight },
        });
        const rowCount = Math.ceil(imgHeight / 20);
        for (let r = currentRow; r < currentRow + rowCount; r++) {
          sheet.getRow(r).height = 20;
        }
        currentRow += rowCount + 2;
      }
      sheet.getColumn(1).width = 100;
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
      <div
        className={`uploadBox ${isDragging ? 'dragging' : ''}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
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
      {file && (
        <div className="previewContainer">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<p className="loading">PDF를 불러오는 중...</p>}
          >
            {numPages &&
              Array.from({ length: numPages }, (_, i) => (
                <div key={`page_${i + 1}`} className="pageWrapper">
                  <Page
                    pageNumber={i + 1}
                    width={500}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                  <p className="pageInfo">
                    {i + 1} / {numPages} 페이지
                  </p>
                </div>
              ))}
          </Document>
        </div>
      )}
      {!file && (
        <div className="placeholder">
          파일을 업로드하면 여기에 미리보기가 표시됩니다.
        </div>
      )}
    </div>
  );
}

// App은 라우터 역할
function App() {
  return (
    <BrowserRouter>
      <nav className="nav">
        <Link to="/">📄 PDF 뷰어</Link>
        <Link to="/upload">📎 이미지 업로드</Link>
        <Link to="/list">📋 영수증 목록</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ReceiptPdf />} />
        <Route path="/upload" element={<PutImg />} />
        <Route path="/list" element={<ImgList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
