'use client';

import type { Receipt } from '@/types/receipt';
import '../../css/ImgList.css';
import '../../css/ThumbnailItem.css';

interface ThumbnailItemProps {
  receipt: Receipt; // 영수증 데이터
  isSelected: boolean; // 선택 여부 (active 스타일)
  apiBase: string; // 서버 주소
  onSelect: (r: Receipt) => void; // 클릭 시 선택 핸들러
  onDelete: (id: string, e: React.MouseEvent) => void; // 삭제 버튼 핸들러
}

// 썸네일 아이템 컴포넌트
// 왼쪽 목록의 각 항목 렌더링 담당
// PDF는 아이콘, 이미지는 썸네일로 표시
export default function ThumbnailItem({
  receipt,
  isSelected,
  apiBase,
  onSelect,
  onDelete,
}: ThumbnailItemProps) {
  return (
    <div
      className={`imglist-item ${isSelected ? 'active' : ''}`}
      onClick={() => onSelect(receipt)}
    >
      {/* 타입에 따라 썸네일 분기
          PDF → 📄 아이콘
          이미지 → 실제 썸네일 */}
      {receipt.type === 'pdf' ? (
        <div className="thumbnail-pdf-icon">📄</div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`${apiBase}${receipt.url}`}
          alt={receipt.name}
          className="thumbnail-img"
        />
      )}

      {/* 파일명 + 날짜 */}
      <div className="imglist-info">
        <p className="imglist-name">{receipt.name}</p>
        {/* ISO 날짜 → 한국 날짜 포맷 변환 */}
        <p className="imglist-date">
          {new Date(receipt.createdAt).toLocaleDateString('ko-KR')}
        </p>
      </div>

      {/* 삭제 버튼
          e.stopPropagation()으로 부모 클릭 이벤트 전파 방지 */}
      <button
        className="imglist-delete-btn"
        onClick={(e) => onDelete(receipt.id, e)}
      >
        🗑️
      </button>
    </div>
  );
}
