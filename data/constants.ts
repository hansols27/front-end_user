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
  ];

  export const TERMS = [
    { id: 'service', label: '이용약관 동의', required: true },
    { id: 'privacy', label: '개인정보 수집 및 이용 동의', required: true },
    { id: 'marketing', label: '마케팅 정보 수신 동의', required: false },
  ];

  export const socialLogins = [
    {
      name: '네이버',
      className: 'btn-naver',
      icon: '/icons/naver.svg',
      provider: 'naver',
      userName: '김네이버',
      email: 'naver_user@naver.com',
      nickname: '네이버팬',
      phoneNumber: '010-1234-5678',
      profileImage:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },
    {
      name: '카카오',
      className: 'btn-kakao',
      icon: '/icons/kakao.svg',
      provider: 'kakao',
      userName: '이카카오',
      email: 'kakao_user@kakao.com',
      nickname: '카카오친구',
      phoneNumber: '010-8765-4321',
      profileImage:
        'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png',
    },
    {
      name: '구글',
      className: 'btn-google',
      icon: '/icons/google.svg',
      provider: 'google',
      userName: '박구글',
      email: 'google_user@gmail.com',
      nickname: '구글유저',
      phoneNumber: '010-5555-4444',
      profileImage:
        'https://cdn.pixabay.com/photo/2017/06/13/12/54/profile-2398782_1280.png',
    },
  ];

  export const chodanSNS = [
    { name: 'cafe', src: '/icons/cafe.svg', url: 'https://cafe.naver.com/eggkim' },
    { name: 'instagram', src: '/icons/instagram.svg', url: 'https://www.instagram.com/qwerband_official/' },
    { name: 'tiktok', src: '/icons/tiktok.svg', url: 'https://www.tiktok.com/@qwerband_official' },
    { name: 'youtube', src: '/icons/youtube.svg', url: 'https://www.youtube.com/channel/UCgD0APk2x9uBlLM0UsmhQjw' },
  ];

  export const majentaSNS = [
    { name: 'cafe', src: '/icons/cafe.svg', url: 'https://cafe.naver.com/eggkim' },
    { name: 'instagram', src: '/icons/instagram.svg', url: 'https://www.instagram.com/qwerband_official/' },
    { name: 'tiktok', src: '/icons/tiktok.svg', url: 'https://www.tiktok.com/@qwerband_official' },
    { name: 'youtube', src: '/icons/youtube.svg', url: 'https://www.youtube.com/channel/UCgD0APk2x9uBlLM0UsmhQjw' },
  ];

  export const hinaSNS = [
    { name: 'cafe', src: '/icons/cafe.svg', url: 'https://cafe.naver.com/eggkim' },
    { name: 'instagram', src: '/icons/instagram.svg', url: 'https://www.instagram.com/qwerband_official/' },
    { name: 'tiktok', src: '/icons/tiktok.svg', url: 'https://www.tiktok.com/@qwerband_official' },
    { name: 'youtube', src: '/icons/youtube.svg', url: 'https://www.youtube.com/channel/UCgD0APk2x9uBlLM0UsmhQjw' },
  ];

  export const siyeonSNS = [
    { name: 'instagram', src: '/icons/instagram.svg', url: 'https://www.instagram.com/qwerband_official/' },
    { name: 'tiktok', src: '/icons/tiktok.svg', url: 'https://www.tiktok.com/@qwerband_official' },
  ];