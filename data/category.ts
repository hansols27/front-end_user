export const languageOptions = [
    { value: 'ko', label: 'KR' },
    { value: 'en', label: 'EN' },
  ];

export const Community_category = [
    { value: 'all', label: '전체' },
    { value: 'free', label: '자유게시판' },
    { value: 'info', label: '정보공유' },
    { value: 'share', label: '나눔/교환' },
  ];
  
  export const getCommunity_category = (value: string) => {
    const category = Community_category.find((opt) => opt.value === value);
    return category ? category.label : '전체';
  };

  export const Notice_category = [
    { value: 'all', label: '전체' },
    { value: 'noti', label: '공지' },
    { value: 'event', label: '이벤트' },
  ];
  
  export const getNotice_category = (value: string) => {
    const category = Notice_category.find((opt) => opt.value === value);
    return category ? category.label : '전체';
  };