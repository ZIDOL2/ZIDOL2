'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import '../css/PutImg.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const API_BASE = 'http://localhost:8080';

interface Preview {
  name: string;
  objectUrl: string;
  file: File;
}

export default function PutImg() {
  // 이미지 관련 state
  const [previews, setPreviews] = useState<Preview[]>([]);
  // PDF 관련 state
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  // 공통 state
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  // 파일 처리 - PDF / 이미지 자동 구분
  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const fileArr = [...files];

    const pdfFiles = fileArr.filter((f) => f.type === 'application/pdf');
    const imageFiles = fileArr.filter((f) => f.type.startsWith('image/'));

    if (pdfFiles.length > 0) {
      // PDF는 1개만 허용
      setPdfFile(pdfFiles[0]);
      setNumPages(null);
      setPreviews([]); // 이미지 초기화
    }

    if (imageFiles.length > 0) {
      const newPreviews: Preview[] = imageFiles.map((f) => ({
        name: f.name,
        objectUrl: URL.createObjectURL(f),
        file: f,
      }));
      setPreviews((prev) => [...prev, ...newPreviews]);
      setPdfFile(null); // PDF 초기화
      setNumPages(null);
    }

    if (pdfFiles.length === 0 && imageFiles.length === 0) {
      alert('PDF 또는 이미지 파일만 선택해 주세요!');
    }
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleFiles(e.target.files);
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  // 이미지 개별 삭제
  const removeImage = (index: number) => {
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index].objectUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  // PDF 저장
  const handleSavePdf = async () => {
    if (!pdfFile) return;
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append('pdf', pdfFile);
      const res = await fetch(`${API_BASE}/api/images/upload/pdf`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('저장 실패');
      alert('PDF 저장 완료!');
      router.push('/list');
    } catch (err) {
      alert('저장 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  // 이미지 저장
  const handleSaveImages = async () => {
    if (!previews.length) return;
    setIsSaving(true);
    try {
      const formData = new FormData();
      previews.forEach((p) => formData.append('images', p.file));
      const res = await fetch(`${API_BASE}/api/images/upload`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('저장 실패');
      alert(`${previews.length}장 저장 완료!`);
      router.push('/list');
    } catch (err) {
      alert('저장 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="putimg-container">
      <h2 className="putimg-title">📎 영수증 등록</h2>

      {/* 드래그앤드롭 영역 - PDF + 이미지 둘 다 허용 */}
      <div
        className={`putimg-dropzone ${isDragging ? 'dragging' : ''}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <input
          type="file"
          accept="image/*,.pdf"
          multiple
          onChange={onFileChange}
          id="img-upload"
          className="putimg-input"
        />
        <label htmlFor="img-upload" className="putimg-label">
          {isDragging
            ? '여기에 놓으세요!'
            : 'PDF 또는 이미지를 드래그하세요 (이미지는 여러 장 가능)'}
        </label>
      </div>

      {/* ── PDF 선택 시 ── */}
      {pdfFile && (
        <>
          <p className="putimg-count">📄 {pdfFile.name}</p>
          <div className="putimg-btn-group">
            <button
              className="putimg-save-btn"
              onClick={handleSavePdf}
              disabled={isSaving}
            >
              {isSaving ? '저장 중...' : '💾 저장'}
            </button>
          </div>
          {/* PDF 미리보기 */}
          <div className="putimg-pdf-preview">
            <Document
              file={pdfFile}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              loading={<p className="putimg-loading">PDF 불러오는 중...</p>}
            >
              {numPages &&
                Array.from({ length: numPages }, (_, i) => (
                  <div key={`page_${i + 1}`} className="putimg-page-wrapper">
                    <Page
                      pageNumber={i + 1}
                      width={500}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                    <p className="putimg-page-info">
                      {i + 1} / {numPages} 페이지
                    </p>
                  </div>
                ))}
            </Document>
          </div>
        </>
      )}

      {/* ── 이미지 선택 시 ── */}
      {previews.length > 0 && (
        <>
          <p className="putimg-count">선택된 이미지: {previews.length}장</p>
          <div className="putimg-grid">
            {previews.map((img, i) => (
              <div key={i} className="putimg-thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.objectUrl} alt={img.name} />
                <p className="putimg-thumb-name">{img.name}</p>
                <button
                  className="putimg-remove"
                  onClick={() => removeImage(i)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <div className="putimg-btn-group">
            <button
              className="putimg-save-btn"
              onClick={handleSaveImages}
              disabled={isSaving}
            >
              {isSaving ? '저장 중...' : '💾 저장하기'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
