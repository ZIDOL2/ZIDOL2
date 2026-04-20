'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PdfUpload from './PdfUpload';
import ImageUpload from './ImageUpload';
import '../../css/PutImg.css';

const API_BASE = 'http://localhost:8080';

// 이미지 미리보기 타입
interface Preview {
  name: string;
  objectUrl: string;
  file: File;
}

// 업로드 메인 컴포넌트
// 파일 선택 시 PDF / 이미지 자동 구분
// PDF → PdfUpload 컴포넌트 렌더링
// 이미지 → ImageUpload 컴포넌트 렌더링
export default function PutImg() {
  const [previews, setPreviews] = useState<Preview[]>([]); // 이미지 미리보기 목록
  const [pdfFile, setPdfFile] = useState<File | null>(null); // 선택된 PDF 파일
  const [isDragging, setIsDragging] = useState(false); // 드래그 중 여부
  const [isSaving, setIsSaving] = useState(false); // 저장 중 여부
  const router = useRouter();

  // 파일 처리 - PDF / 이미지 자동 구분
  // useCallback: 불필요한 재생성 방지
  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const fileArr = [...files];

    // PDF 파일 필터링
    const pdfFiles = fileArr.filter((f) => f.type === 'application/pdf');
    // 이미지 파일 필터링
    const imageFiles = fileArr.filter((f) => f.type.startsWith('image/'));

    if (pdfFiles.length > 0) {
      // PDF 선택 시 - 1개만 허용, 이미지 목록 초기화
      setPdfFile(pdfFiles[0]);
      setPreviews([]);
    }
    if (imageFiles.length > 0) {
      // 이미지 선택 시 - 기존 목록에 추가, PDF 초기화
      const newPreviews: Preview[] = imageFiles.map((f) => ({
        name: f.name,
        objectUrl: URL.createObjectURL(f), // 임시 브라우저 URL 생성
        file: f,
      }));
      setPreviews((prev) => [...prev, ...newPreviews]);
      setPdfFile(null);
    }
    if (pdfFiles.length === 0 && imageFiles.length === 0) {
      alert('PDF 또는 이미지 파일만 선택해 주세요!');
    }
  }, []);

  // input[type=file] onChange 핸들러
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleFiles(e.target.files);

  // 드래그 이벤트 핸들러
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
  // URL.revokeObjectURL로 메모리 해제 필수!
  const removeImage = (index: number) => {
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index].objectUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  // PDF 서버 저장
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

  // 이미지 서버 저장
  // 여러 파일을 같은 key('images')로 append → 서버에서 List<MultipartFile>로 수신
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

      {/* 드래그앤드롭 영역
          PDF + 이미지 둘 다 허용 (accept="image/*,.pdf") */}
      <div
        className={`putimg-dropzone ${isDragging ? 'dragging' : ''}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {/* input 숨기고 label로 클릭 이벤트 연결 */}
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

      {/* PDF 선택 시 → PdfUpload 컴포넌트 */}
      {pdfFile && (
        <PdfUpload file={pdfFile} isSaving={isSaving} onSave={handleSavePdf} />
      )}

      {/* 이미지 선택 시 → ImageUpload 컴포넌트 */}
      {previews.length > 0 && (
        <ImageUpload
          previews={previews}
          isSaving={isSaving}
          onSave={handleSaveImages}
          onRemove={removeImage}
        />
      )}
    </div>
  );
}
