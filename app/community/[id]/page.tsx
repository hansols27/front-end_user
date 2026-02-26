'use client';

import { useParams, useRouter } from 'next/navigation';
import SideLayout from '@/components/layout/SideLayout';
import { useDevice } from '@/hooks/useDevice';
import Button from '@/components/common/Button';
import { getCommunity_category } from '@/data/category';

// 데이터 인터페이스 정의
interface CommunityData {
  id: string;    
  category: string;
  title: string;
  author: string;
  date: string;
  content: string;
}

export default function NoticeDetailPage({ params }: { params: { id: string } }) {
  const device = useDevice();
  const router = useRouter();

  // 임시 데이터 (album 변수명 유지)
  const community: CommunityData = {
    id: params.id,
    category: 'info',
    title: '공지사항 상세 페이지 제목입니다.',
    author: '관리자',
    date: '2026.01.20',
    content: `공지사항 상세 내용 영역입니다. 요청하신 대로 레이아웃 구조를 목록 페이지와 동일하게 가져왔습니다. PC와 모바일의 간격 가이드를 준수합니다.\n여기는 실제 게시글의 상세 내용이 출력되는 부분입니다.`
  };

  if (!device) return null;

  const handleGoList = () => {
    router.push('/community');
  };

  /* =========================
      PC 버전
  ========================= */
  if (device === 'pc') {
    return (
      <SideLayout num="07" title="NotCommunityice">
        <div className="flex w-full gap-[80px] items-start">
          <div className="flex flex-col w-full">
            {/* 1단: 제목 */}
            <h1 className="text-h3 font-bold text-white">{community.title}</h1>

            {/* 2단 그룹: 카테고리 / 작성자|작성일 (간격: PC 20px) */}
            <div className="flex items-center justify-between mt-[20px]">
              <span className="text-h5">{getCommunity_category(community.category)}</span>
              <div className="flex items-center gap-[10px] text-white text-h5">
                <span>{community.author}</span>
                <span className="w-px h-[15px] bg-white" />
                <span>{community.date}</span>
              </div>
            </div>

            {/* 라인 (상단 간격: PC 20px) */}
            <div className="w-full h-px bg-white mt-[20px] mb-[20px]" />

            {/* 내용 영역 */}
            <div className="text-white text-h4 leading-relaxed min-h-[300px]">
              <p className="whitespace-pre-wrap">{community.content}</p>
            </div>

            {/* 라인 (하단 간격: PC 40px) */}
            <div className="w-full h-px bg-white mt-[40px]" />

            {/* 목록 버튼 (우측 끝, 간격: PC 40px) */}
            <div className="flex justify-end mt-[40px]">
              <Button variant="black" size="md" className="w-[120px]" onClick={handleGoList}>
                목록
              </Button>
            </div>
          </div>
        </div>
      </SideLayout>
    );
  }

  /* =========================
      모바일 버전
  ========================= */
  if (device === 'mo') {
    return (
      <main className="sub-page-layout">
        <div className="mo-content">
          <div className="flex flex-col w-full px-5">
            {/* 1단: 제목 */}
            <h1 className="text-h4 font-bold text-white">{community.title}</h1>

            {/* 2단 그룹: 카테고리 / 작성자|작성일 (간격: MO 10px) */}
            <div className="flex items-center justify-between mt-[10px]">
              <span className="text-h6">{getCommunity_category(community.category)}</span>
              <div className="flex items-center gap-[10px] text-white text-h6">
                <span>{community.author}</span>
                <span className="w-px h-[10px] bg-white" />
                <span>{community.date}</span>
              </div>
            </div>

            {/* 라인 (상단 간격: MO 10px) */}
            <div className="w-full h-1px bg-white mt-[10px] mb-[10px]" />

            {/* 내용 영역 */}
            <div className="text-white text-h5 leading-relaxed min-h-[200px]">
              <p className="whitespace-pre-wrap">{community.content}</p>
            </div>

            {/* 라인 (하단 간격: MO 20px) */}
            <div className="w-full h-px bg-white mt-[20px]" />

            {/* 목록 버튼 (우측 끝, 간격: MO 20px) */}
            <div className="flex justify-end mt-[20px]">
              <Button variant="black" size="sm" className="w-[80px]" onClick={handleGoList}>
                목록
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return null;
}