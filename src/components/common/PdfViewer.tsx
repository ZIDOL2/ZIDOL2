'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import '../../css/PdfViewer.css';

// PDF.js 워커 설정
// pdfjs.version으로 설치된 버전과 자동으로 맞춰줌 (버전 불일치 에러 방지)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  // File 객체 (업로드 시) 또는 URL 문자열 (서버에서 불러올 때) 둘 다 지원
  file: File | string;
  // 페이지 렌더링 너비 (기본값 500px)
  width?: number;
}

// 재사용 가능한 PDF 뷰어 컴포넌트
// 업로드 미리보기 / 목록 미리보기 두 곳에서 모두 사용
export default function PdfViewer({ file, width = 500 }: PdfViewerProps) {
  // PDF 총 페이지 수
  const [numPages, setNumPages] = useState<number | null>(null);

  return (
    <div className="pdfviewer-container">
      {/* PDF 렌더링
          Document: PDF 파일 로드
          Page: 각 페이지를 canvas로 렌더링 */}
      <Document
        file={file}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={<p className="pdfviewer-loading">PDF 불러오는 중...</p>}
        error={<p className="pdfviewer-error">PDF 불러오기 실패</p>}
      >
        {/* numPages만큼 Page 컴포넌트 생성 */}
        {numPages &&
          Array.from({ length: numPages }, (_, i) => (
            <div key={`page_${i + 1}`} className="pdfviewer-page-wrapper">
              <Page
                pageNumber={i + 1}
                width={width}
                renderTextLayer={false} // 텍스트 레이어 비활성화
                renderAnnotationLayer={false} // 주석 레이어 비활성화
              />
              <p className="pdfviewer-page-info">
                {i + 1} / {numPages} 페이지
              </p>
            </div>
          ))}
      </Document>
    </div>
  );
}
