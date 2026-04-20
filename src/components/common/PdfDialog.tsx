'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import '../../css/PdfDialog.css';

interface PdfDialogProps {
  url: string;
  fileName: string;
  onClose: () => void;
}

export default function PdfDialog({ url, fileName, onClose }: PdfDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // 드래그 관련 state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ mouseX: 0, mouseY: 0, posX: 0, posY: 0 });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();

    const handleClose = () => onClose();
    dialog.addEventListener('close', handleClose);
    document.body.style.overflow = 'hidden';

    return () => {
      dialog.removeEventListener('close', handleClose);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  // 드래그 시작 - 헤더 mousedown 시 실행
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    // 현재 마우스 위치와 모달 위치 저장
    dragStart.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      posX: position.x,
      posY: position.y,
    };
  }, [position]);

  // 드래그 중 - mousemove 시 실행
const handleMouseMove = useCallback((e: React.MouseEvent) => {
  if (!isDragging) return;

  const dx = e.clientX - dragStart.current.mouseX;
  const dy = e.clientY - dragStart.current.mouseY;

  const dialog = dialogRef.current;
  if (!dialog) return;

  // 모달 크기
  const dialogW = dialog.offsetWidth;
  const dialogH = dialog.offsetHeight;

  // 화면 크기
  const screenW = window.innerWidth;
  const screenH = window.innerHeight;

  // 이동 가능한 최대 범위 계산
  // 모달이 화면 밖으로 나가지 않도록 제한
  const maxX = (screenW - dialogW) / 2;
  const maxY = (screenH - dialogH) / 2;

  const newX = dragStart.current.posX + dx;
  const newY = dragStart.current.posY + dy;

  setPosition({
    // Math.min/max로 범위 제한
    x: Math.min(Math.max(newX, -maxX), maxX),
    y: Math.min(Math.max(newY, -maxY), maxY),
  });
}, [isDragging]);

  // 드래그 종료
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    // mousemove, mouseup을 dialog 전체에서 감지
    <dialog
      ref={dialogRef}
      className="pdfdialog"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      // transform으로 드래그 위치 적용
      style={{ transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))` }}
    >
      {/* 헤더 - 드래그 핸들 역할 */}
      <div
        className={`pdfdialog-header ${isDragging ? 'dragging' : ''}`}
        onMouseDown={handleMouseDown}
      >
        <span className="pdfdialog-filename">📄 {fileName}</span>
        <button
          className="pdfdialog-close"
          // 닫기 버튼 클릭 시 드래그 방지
          onMouseDown={(e) => e.stopPropagation()}
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      {/* iframe PDF 뷰어 */}
      <iframe
        src={url}
        className="pdfdialog-iframe"
        title={fileName}
      />
    </dialog>
  );
}
