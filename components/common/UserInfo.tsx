import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

interface UserInfoProps {
  type?: 'row' | 'col';
  size: 'comment' | 'header' | 'mypage-pc' | 'mypage-mo' | 'mypage'; 
  nickname: string;
  profileSrc?: string;
  isEdit?: boolean;
  className?: string;
}

export default function UserInfo({
  type,
  size,
  nickname,
  profileSrc,
  isEdit,
  className = '',
}: UserInfoProps) {
  
  // 1. 사이즈 명칭을 CSS 클래스와 1:1로 매칭
  const sizeClass = `user-size-${size}`;
  
  // 2. 카메라 아이콘은 마이페이지 PC(80px)일 때만 pc-camera, 나머지는 mo-camera
  const cameraClass = size === 'mypage-pc' ? 'pc-camera' : 'mo-camera';

  return (
    <div className={`user-info-comp user-type-${type} ${sizeClass} ${className}`}>
      <div className="profile-img-wrapper">
        <img 
          src={profileSrc || '/images/default-profile.png'} 
          className="profile-img" 
          alt={nickname} 
        />
        
        {/* 수정 모드일 때만 카메라 아이콘 생성 */}
        {isEdit && (
          <label className={`camera-badge ${cameraClass}`}>
            <PhotoCameraIcon className="camera-icon" />
            <input type="file" className="hidden" accept="image/*" />
          </label>
        )}
      </div>

      {nickname && <span className="nickname">{nickname}</span>}
    </div>
  );
}