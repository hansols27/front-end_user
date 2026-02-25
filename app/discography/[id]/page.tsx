'use client';

import { useRouter } from 'next/navigation';
import SideLayout from '@/components/layout/SideLayout';
import { useDevice } from '@/hooks/useDevice';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// 데이터 인터페이스 정의 (나중에 API 연동 시 활용)
interface AlbumData {
  id: string;
  title: string;
  date: string;
  description: string;
  info: string;
  tracks: string[];
  youtubeId: string;
  coverImage: string;
}

export default function DiscographyDetailPage({ params }: { params: { id: string } }) {
  const device = useDevice();
  const router = useRouter();

  // 실제 연동 시에는 여기서 params.id를 이용해 데이터를 fetch합니다.
  const album: AlbumData = {
    id: params.id,
    title: "QWER 1st Single Album [Harmony from Discord]",
    date: "2023.10.18",
    description: "국내 최대 뉴미디어 콘텐츠 스튜디오 3Y코퍼레이션의 타마고 프로덕션이 기획·제작한 글로벌 걸밴드 QWER의 데뷔 싱글.",
    info: "각기 다른 공간에서 존재하던 멤버들이 하나의 화음으로 합쳐지는 과정을 담아낸 앨범입니다. 타이틀곡 'Discord'는 경쾌한 록 사운드와 멤버들의 개성 있는 보컬이 어우러져 리스너들에게 강렬한 에너지를 선사합니다.\n\n다양한 감정의 선율을 따라가다 보면 어느새 QWER만의 음악 세계에 빠져들게 될 것입니다.",
    tracks: ["1. Discord", "2. 별의 하모니", "3. 너의 슬픔을 내가 다 가져갈게", "4. Discord (Inst.)"],
    youtubeId: "vMvI-uNoxjM",
    coverImage: "/images/album/placeholder.png"
  };

  if (!device) return null;

  // =========================
  // PC 버전
  // =========================
  if (device === 'pc') {
    return (
      <SideLayout num="02" title="Discography">
        <div className="flex w-full gap-[80px] items-start">
          
          {/* 1단: 좌측 영역 (이미지 및 트랙리스트) */}
          <div className="flex-[0.8] min-w-0">
            {/* BACK 버튼: 아이콘 40x40, 텍스트 text-h2 */}
            <button 
              onClick={() => router.push('/discography')}
              className="flex items-center gap-[10px] hover:opacity-60 transition-opacity mb-[40px]"
            >
              <div className="flex items-center justify-center w-[40px] h-[40px]">
                <ArrowBackIosNewIcon sx={{ fontSize: 40 }} />
              </div>
              <span className="text-h2 font-bold uppercase">BACK</span>
            </button>

            {/* 앨범 이미지: 40px 아래, Radius 12px, x:15 y:15 연한 회색 그림자 */}
            <div 
              className="relative w-full aspect-square rounded-[12px] bg-gray-100 overflow-hidden shrink-0"
              style={{ boxShadow: '10px 10px 0px 0px var(--color-gray-sub)' }}
            >
              <img 
                src={album.coverImage} 
                alt={album.title} 
                className="w-full h-full object-cover" 
              />
            </div>

            {/* 일자 및 트랙리스트: 40px 아래, 텍스트 왼쪽 정렬, 간격 20px */}
            <div className="mt-[40px] flex flex-col text-left">
              <span className="text-h4 text-white font-medium">{album.date}</span>
              <div className="mt-[20px] flex flex-wrap gap-x-[20px] gap-y-[10px]">
                {album.tracks.map((track, i) => (
                  <p key={i} className="text-h5 font-bold whitespace-nowrap break-keep">{track}</p>
                ))}
              </div>
            </div>
          </div>

          {/* 2단: 우측 영역 (타이틀 및 영상) */}
          <div className="flex-1 min-w-0">
            {/* 타이틀 그룹: 타이틀, 설명, 앨범 소개 간격 20px */}
            <div className="flex flex-col gap-[20px]">
              <h1 className="text-h2 font-bold">{album.title}</h1>
              <p className="text-h4 text-white font-medium">{album.description}</p>
              <div className="text-h5 text-white leading-relaxed whitespace-pre-line">
                {album.info}
              </div>
            </div>

            {/* 유튜브 영상: 앨범 소개 40px 아래 */}
            <div className="mt-[40px] w-full aspect-video rounded-[12px] overflow-hidden bg-black shadow-lg">
              <iframe
                className="w-full h-full border-none"
                src={`https://www.youtube.com/embed/${album.youtubeId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

        </div>
      </SideLayout>
    );
  }

  // =========================
  // MOBILE 버전
  // =========================
  if (device === 'mo') {
    return (
      <main className="sub-page-layout">
        <div className="mo-content">
          
          {/* BACK 버튼: 아이콘 25x25, 텍스트 text-h4 */}
          <button 
            onClick={() => router.push('/discography')}
            className="flex items-center gap-[6px] hover:opacity-60 transition-opacity mb-[20px]"
          >
            <div className="flex items-center justify-center w-[25px] h-[25px]">
              <ArrowBackIosNewIcon sx={{ fontSize: 25 }} />
            </div>
            <span className="text-h4 font-bold uppercase">BACK</span>
          </button>

          {/* 앨범 이미지: 20px 아래, Radius 12px, x:10 y:10 연한 회색 그림자 */}
          <div 
            className="relative w-full aspect-square rounded-[12px] bg-gray-100 overflow-hidden"
            style={{ boxShadow: '10px 10px 0px 0px rgba(220, 220, 220, 1)' }}
          >
            <img 
              src={album.coverImage} 
              alt={album.title} 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* 일자 및 트랙리스트: 20px 아래, 간격 10px */}
          <div className="mt-[20px] flex flex-col text-left">
            <span className="text-h4 text-gray-500">{album.date}</span>
            <div className="mt-[10px] flex flex-wrap gap-x-[10px] gap-y-[5px]">
              {album.tracks.map((track, i) => (
                <p key={i} className="text-h5 font-bold whitespace-nowrap break-keep">{track}</p>
              ))}
            </div>
          </div>

          {/* 타이틀 그룹: 트랙리스트 40px 아래, 간격 10px */}
          <div className="mt-[40px] flex flex-col gap-[10px]">
            <h1 className="text-h3 font-bold">{album.title}</h1>
            <p className="text-h5 text-gray-700 font-medium">{album.description}</p>
            <div className="text-h6 text-gray-600 leading-snug whitespace-pre-line">
              {album.info}
            </div>
          </div>

          {/* 유튜브 영상: 앨범 소개 20px 아래 */}
          <div className="mt-[20px] w-full aspect-video rounded-[12px] overflow-hidden bg-black">
            <iframe
              className="w-full h-full border-none"
              src={`https://www.youtube.com/embed/${album.youtubeId}`}
              title="YouTube video player"
              allowFullScreen
            />
          </div>
        </div>
      </main>
    );
  }

  return null;
}