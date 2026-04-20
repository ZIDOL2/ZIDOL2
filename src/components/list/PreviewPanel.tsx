'use client';

import type { Receipt } from '@/types/receipt';
import PdfViewer from '../common/PdfViewer';
import '../../css/PreviewPanel.css';

interface PreviewPanelProps {
  selected: Receipt | null; // 현재 선택된 영수증 (null이면 placeholder 표시)
  apiBase: string; // 서버 주소
}

// 미리보기 패널 컴포넌트
// 오른쪽 미리보기 영역 담당
// PDF → PdfViewer 컴포넌트 (다운로드/프린트 버튼 포함)
// 이미지 → <img> 태그로 표시
export default function PreviewPanel({ selected, apiBase }: PreviewPanelProps) {
  // 선택된 항목 없으면 안내 문구 표시
  if (!selected) {
    return (
      <div className="preview-panel-wrap">
        <p className="preview-panel-placeholder">
          왼쪽 목록에서 이미지를 클릭하면 미리보기가 표시됩니다.
        </p>
      </div>
    );
  }

  return (
    <div className="preview-panel-wrap">
      {/* 파일명 표시 */}
      <p className="preview-panel-name">{selected.name}</p>

      {selected.type === 'pdf' ? (
        // PDF 미리보기
        // showActions=true → 다운로드/프린트 버튼 표시
        // file에 서버 URL 전달
        <PdfViewer file={`${apiBase}${selected.url}`} width={400} />
      ) : (
        // 이미지 미리보기
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`${apiBase}${selected.url}`}
          alt={selected.name}
          className="preview-panel-img"
        />
      )}
    </div>
  );
}
