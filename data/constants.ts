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

  export const snsIcons = [
    { name: 'cafe', src: '/icons/cafe.svg', url: 'https://cafe.naver.com/eggkim' },
    { name: 'instagram', src: '/icons/instagram.svg', url: 'https://www.instagram.com/qwerband_official/' },
    { name: 'tiktok', src: '/icons/tiktok.svg', url: 'https://www.tiktok.com/@qwerband_official' },
    { name: 'weverse', src: '/icons/weverse.png', url: 'https://weverse.io/qwer/artistpedia' },
    { name: 'youtube', src: '/icons/youtube.svg', url: 'https://www.youtube.com/channel/UCgD0APk2x9uBlLM0UsmhQjw' },
    { name: 'shop', src: '/icons/shop.png', url: 'https://qwershop.kr/index.html' },
  ];

  export const menuItems = [
    { name: 'Profile', path: '/profile' },
    { name: 'Discography', path: '/discography' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Video', path: '/video' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Notice', path: '/notice' },
    { name: 'Community', path: '/community' },
    { name: 'Mypage', path: '/mypage' },
  ];