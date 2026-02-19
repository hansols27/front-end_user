// @/data/constants.ts
export const CATEGORY_OPTIONS = [
    { value: 'all', label: '전체' },
    { value: 'free', label: '자유게시판' },
    { value: 'qna', label: 'Q&A' },
  ];
  
  // value를 넣으면 label을 반환하는 유틸리티 함수
  export const getCategoryLabel = (value: string) => {
    const category = CATEGORY_OPTIONS.find((opt) => opt.value === value);
    return category ? category.label : '전체';
  };

  export const languageOptions = [
    { value: 'ko', label: 'KR' },
    { value: 'en', label: 'EN' },
  ];