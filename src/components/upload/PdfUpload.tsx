'use client';

import PdfViewer from '../common/PdfViewer';
import '../../css/PutImg.css';

interface PdfUploadProps {
  file: File; // 선택된 PDF 파일 객체
  isSaving: boolean; // 저장 중 여부 (버튼 중복 클릭 방지)
  onSave: () => void; // 저장 버튼 클릭 핸들러
}

// PDF 업로드 컴포넌트
// PutImg에서 PDF 선택 시 렌더링
// 저장 버튼 + PDF 미리보기 담당
export default function PdfUpload({ file, isSaving, onSave }: PdfUploadProps) {
  return (
    <>
      {/* 선택된 파일명 표시 */}
      <p className="putimg-count">📄 {file.name}</p>

      {/* 저장 버튼 */}
      <div className="putimg-btn-group">
        <button
          className="putimg-save-btn"
          onClick={onSave}
          disabled={isSaving}
        >
          {isSaving ? '저장 중...' : '💾 저장'}
        </button>
      </div>

      {/* PDF 미리보기 - 공통 PdfViewer 컴포넌트 사용
          업로드 시에는 File 객체 전달, showActions 불필요 */}
      <div className="putimg-pdf-preview">
        <PdfViewer file={file} width={500} />
      </div>
    </>
  );
}
