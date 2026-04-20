'use client';

import '../../css/ImageUpload.css';

// 이미지 미리보기 타입
interface Preview {
  name: string;
  objectUrl: string; // URL.createObjectURL()로 생성한 임시 URL
  file: File; // 실제 업로드할 File 객체
}

interface ImageUploadProps {
  previews: Preview[]; // 선택된 이미지 목록
  isSaving: boolean; // 저장 중 여부
  onSave: () => void; // 저장 버튼 클릭 핸들러
  onRemove: (index: number) => void; // 개별 이미지 삭제 핸들러
}

// 이미지 업로드 컴포넌트
// PutImg에서 이미지 선택 시 렌더링
// 썸네일 그리드 + 개별 삭제 + 저장 버튼 담당
export default function ImageUpload({
  previews,
  isSaving,
  onSave,
  onRemove,
}: ImageUploadProps) {
  return (
    <>
      {/* 선택된 이미지 수 표시 */}
      <p className="imageupload-count">선택된 이미지: {previews.length}장</p>

      {/* 썸네일 그리드 */}
      <div className="imageupload-grid">
        {previews.map((img, i) => (
          <div key={i} className="imageupload-thumb">
            {/* objectUrl로 미리보기 표시
                URL.createObjectURL()로 생성한 임시 브라우저 URL */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.objectUrl} alt={img.name} />
            <p className="imageupload-thumb-name">{img.name}</p>
            {/* 개별 삭제 버튼 - 클릭 시 해당 인덱스 이미지 제거 */}
            <button className="imageupload-remove" onClick={() => onRemove(i)}>
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* 저장 버튼 - 저장 중일 때 비활성화 */}
      <button
        className="imageupload-save-btn"
        onClick={onSave}
        disabled={isSaving}
      >
        {isSaving ? '저장 중...' : '💾 저장하기'}
      </button>
    </>
  );
}
