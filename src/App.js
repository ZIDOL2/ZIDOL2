import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// PDF.js 호환을 위한 Worker 설정 (CDN 방식)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function App() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);

  // 파일 선택 이벤트 핸들러
  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('PDF 파일만 선택해 주세요!');
    }
  };

  // PDF 로드 성공 시 페이지 수 저장
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>PDF 파일 업로드 및 미리보기</h2>

      {/* 파일 업로드 영역 */}
      <div style={styles.uploadBox}>
        <input
          type='file'
          accept='.pdf'
          onChange={onFileChange}
          id='file-upload'
          style={styles.fileInput}
        />
        <label htmlFor='file-upload' style={styles.uploadLabel}>
          {file ? `선택된 파일: ${file.name}` : '클릭하여 PDF 파일 업로드'}
        </label>
      </div>

      {/* 미리보기 영역 */}
      <div style={styles.previewContainer}>
        {file ? (
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<p>PDF를 불러오는 중...</p>}
          >
            <Page
              pageNumber={1}
              width={500}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
            <p style={styles.pageInfo}>
              총 {numPages}페이지 중 1페이지 미리보기
            </p>
          </Document>
        ) : (
          <div style={styles.placeholder}>
            파일을 업로드하면 여기에 미리보기가 표시됩니다.
          </div>
        )}
      </div>
    </div>
  );
}

// 간단한 인라인 스타일
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    fontFamily: 'sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  title: { color: '#333' },
  uploadBox: {
    margin: '20px 0',
    padding: '20px',
    border: '2px dashed #007bff',
    borderRadius: '10px',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
  fileInput: { display: 'none' },
  uploadLabel: {
    cursor: 'pointer',
    color: '#007bff',
    fontWeight: 'bold',
  },
  previewContainer: {
    marginTop: '20px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    lineHeight: 0, // 하단 여백 제거
  },
  placeholder: {
    padding: '100px',
    color: '#aaa',
    border: '1px solid #eee',
  },
  pageInfo: {
    padding: '10px',
    margin: 0,
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    fontSize: '14px',
    lineHeight: '1.5',
  },
};

export default App;
