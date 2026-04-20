// 서버에서 받아오는 영수증 데이터 타입
// 프론트 전체에서 공통으로 사용
export interface Receipt {
  id: string; // 파일 고유 ID (file_1, file_2 ...)
  name: string; // 원본 파일명
  url: string; // 서버 저장 경로 ex) /uploads/file_1.jpg
  type: 'image' | 'pdf'; // 파일 타입 구분
  createdAt: string; // ISO 날짜 문자열
}
