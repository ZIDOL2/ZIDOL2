import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/PutImg.css';

// Spring Boot 서버 주소 상수로 관리 (나중에 배포 시 여기만 수정)
const API_BASE = 'http://localhost:8080';

export default function PutImg() {
  // previews: 선택된 이미지 목록 { name: 파일명, objectUrl: 미리보기용 임시 URL, file: 실제 File 객체 }
  const [previews, setPreviews] = useState([]);
  // isDragging: 드래그 중인지 여부 (드롭존 스타일 변경용)
  const [isDragging, setIsDragging] = useState(false);
  // isSaving: 서버 저장 중인지 여부 (버튼 중복 클릭 방지용)
  const [isSaving, setIsSaving] = useState(false);
  // 저장 완료 후 목록 페이지로 이동하기 위한 훅
  const navigate = useNavigate();

  // 파일 처리 함수 - input 선택, 드래그앤드롭 둘 다 여기서 처리
  // useCallback: 불필요한 재생성 방지 (자식 컴포넌트에 props로 넘길 때 유용)
  const handleFiles = useCallback((files) => {
    if (!files) return;

    // image/* 타입만 필터링 (pdf, doc 등 제외)
    const imageFiles = [...files].filter((f) => f.type.startsWith('image/'));
    if (!imageFiles.length) return alert('이미지 파일만 선택해 주세요!');

    const newPreviews = imageFiles.map((f) => ({
      name: f.name,
      // URL.createObjectURL: File 객체를 브라우저 메모리에 임시 URL로 변환
      // base64보다 가볍고 빠름 (실제 파일은 메모리에 있음)
      objectUrl: URL.createObjectURL(f),
      file: f, // 나중에 FormData로 서버에 보낼 실제 파일
    }));

    // 기존 목록에 새 이미지 추가 (덮어쓰기 아님!)
    setPreviews((prev) => [...prev, ...newPreviews]);
  }, []);

  // input[type=file] onChange 핸들러
  const onFileChange = (e) => handleFiles(e.target.files);

  // 드래그 진입 시 - isDragging true로 변경해서 드롭존 스타일 변경
  const onDragOver = (e) => {
    e.preventDefault(); // 브라우저 기본 동작(새 탭 열기 등) 방지
    setIsDragging(true);
  };

  // 드래그 벗어날 시 - 스타일 원복
  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // 드롭 시 - 파일 추출해서 handleFiles로 전달
  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files); // 드래그한 파일들
  };

  // 개별 이미지 삭제
  const removeImage = (index) => {
    setPreviews((prev) => {
      // URL.revokeObjectURL: createObjectURL로 만든 임시 URL 메모리 해제
      // 안 하면 메모리 누수 발생
      URL.revokeObjectURL(prev[index].objectUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  // 서버에 이미지 저장
  const handleSave = async () => {
    if (!previews.length) return alert('저장할 이미지가 없습니다.');
    setIsSaving(true);
    try {
      // FormData: multipart/form-data 형식으로 파일 전송할 때 사용
      const formData = new FormData();
      // 여러 파일을 같은 key('images')로 append → 서버에서 List<MultipartFile>로 받음
      previews.forEach((p) => formData.append('images', p.file));

      const res = await fetch(`${API_BASE}/api/images/upload`, {
        method: 'POST',
        body: formData,
        // Content-Type은 명시하지 않음!
        // FormData 사용 시 브라우저가 자동으로 multipart/form-data + boundary 설정해줌
      });
      if (!res.ok) throw new Error('업로드 실패');

      alert(`${previews.length}장 저장 완료!`);
      navigate('/list'); // 저장 완료 후 목록 페이지로 이동
    } catch (err) {
      alert('저장 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      // 성공/실패 상관없이 저장 중 상태 해제
      setIsSaving(false);
    }
  };

  return (
    <div className="putimg-container">
      <h2 className="putimg-title">📎 영수증 이미지 업로드</h2>

      {/* 드래그앤드롭 영역 - isDragging 상태에 따라 클래스 변경으로 스타일 전환 */}
      <div
        className={`putimg-dropzone ${isDragging ? 'dragging' : ''}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {/* input은 숨기고 label로 클릭 이벤트 연결 (htmlFor = input id) */}
        <input
          type="file"
          accept="image/*" // 이미지 파일만 선택 가능
          multiple // 여러 장 선택 허용
          onChange={onFileChange}
          id="img-upload"
          className="putimg-input" // display: none
        />
        <label htmlFor="img-upload" className="putimg-label">
          {isDragging
            ? '여기에 놓으세요!'
            : '클릭하거나 이미지를 드래그하세요 (여러 장 가능)'}
        </label>
      </div>

      {/* 이미지가 1장 이상 선택됐을 때만 렌더링 */}
      {previews.length > 0 && (
        <>
          <p className="putimg-count">선택된 이미지: {previews.length}장</p>

          {/* 썸네일 그리드 */}
          <div className="putimg-grid">
            {previews.map((img, i) => (
              <div key={i} className="putimg-thumb">
                {/* objectUrl로 미리보기 표시 */}
                <img src={img.objectUrl} alt={img.name} />
                <p className="putimg-thumb-name">{img.name}</p>
                {/* ✕ 버튼 클릭 시 해당 인덱스 이미지 삭제 */}
                <button
                  className="putimg-remove"
                  onClick={() => removeImage(i)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* 저장 버튼 - 저장 중일 때 비활성화로 중복 요청 방지 */}
          <button
            className="putimg-save-btn"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? '저장 중...' : '💾 저장하기'}
          </button>
        </>
      )}
    </div>
  );
}
