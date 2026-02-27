'use client';

import dynamic from 'next/dynamic';
import SideLayout from '@/components/layout/SideLayout';
import { useDevice } from '@/hooks/useDevice';
import { useState, useEffect } from "react";
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import { Community_category } from '@/data/category';
import ConfirmAlert from '@/components/common/ConfirmAlert';

const CustomEditor = dynamic(() => import('@/components/common/Editor'), { 
    ssr: false,
    loading: () => <div className="w-full h-[480px] lg:h-[640px] bg-black-sub animate-pulse border border-white/10" /> 
  })

export default function CommunityWrite() {
  const device = useDevice();
  const router = useRouter();
  const { id } = useParams();

  const [isCancelAlertOpen, setIsCancelAlertOpen] = useState(false);
  const [isSaveAlertOpen, setIsSaveAlertOpen] = useState(false);

  const realCategories = Community_category.filter(cat => cat.value !== 'all');
  const writeOptions = [{ value: '', label: '선택' }, ...realCategories];

  const [form, setForm] = useState({
    category: '', 
    title: '',
    content: ''
  });

  useEffect(() => {
    const fetchPostData = async () => {
      // 실제로는 API 호출: await fetch(`/api/community/${id}`)
      // 여기서는 예시 데이터를 바로 넣습니다.
      const mockData = {
        category: 'info',
        title: '수정할 기존 제목입니다.',
        content: '<p>기존에 작성했던 내용입니다.</p>'
      };
      
      setForm(mockData);
    };

    if (id) fetchPostData();
  }, [id]);

  const handleEditorChange = (data: string) => {
    setForm(prev => ({ ...prev, content: data }));
  };
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCancelConfirm = () => {
    setIsCancelAlertOpen(false);
    router.push('/community'); // 목록으로 이동
  };

  const handleSavetConfirm = () => {
    // 여기서 실제 API 전송 로직이 들어갑니다. (form 상태값 사용)
    console.log("수정 데이터:", form);
    setIsSaveAlertOpen(false);
    router.push('/community');
  };

  if (!device) return null;

  /* =========================
      PC 버전
  ========================= */
  if (device === 'pc') {
    return (
      <SideLayout num="07" title="Community">
        <div className="flex w-full gap-[80px] items-start">
            <div className="flex flex-col w-full">
                <div className="flex flex-row w-full gap-[10px] mb-[40px]">
                    {/* 1단: 구분 + 제목 */}
                    <Select 
                        device={device}
                        label="구분"
                        name="category"
                        options={writeOptions}
                        value={form.category}
                        onChange={handleInputChange}
                        className="w-[160px]"
                    />
                    <Input 
                        device={device}
                        name="title"
                        placeholder="제목을 입력해 주세요"
                        value={form.title}
                        onChange={handleInputChange}
                        className="flex-1"
                    />                    
                </div> 
                {/* 에디터 영역 */}
                <div className="min-h-[640px] mb-[40px] text-black">
                    <CustomEditor 
                        value={form.content} 
                        onChange={handleEditorChange} 
                    />
                </div>

                    <div className="w-full h-px bg-white mt-[40px]" />

                {/* 버튼 그룹 */}
                <div className="flex justify-end gap-[10px] mt-[40px] mb-[40px]">
                    <Button variant="black" size="md" className="w-[120px]" onClick={() => setIsCancelAlertOpen(true)}>
                        취소
                    </Button>
                    <Button variant="black" size="md" className="w-[120px]" onClick={() => setIsSaveAlertOpen(true)}>
                        저장
                    </Button>
                </div>
            </div>                   
        </div>

        <ConfirmAlert
          device={device}
          type="cancel"
          isOpen={isCancelAlertOpen}
          onConfirm={handleCancelConfirm}
          onCancel={() => setIsCancelAlertOpen(false)}
        />

        <ConfirmAlert
          device={device}
          type="save"
          isOpen={isSaveAlertOpen}
          onConfirm={handleSavetConfirm}
          onCancel={() => setIsSaveAlertOpen(false)}
        />
      </SideLayout>
    );
  }

  /* =========================
      모바일 버전
  ========================= */
  if (device === 'mo') {
    return (
      <main className="sub-page-layout">
        <div className="mo-content px-5">
          <div className="flex flex-col w-full gap-[10px] mb-[20px]">
            {/* 1단: 구분 + 제목 */}
            <Select 
                device={device}
                label="구분"
                name="category"
                options={writeOptions}
                value={form.category}
                onChange={handleInputChange}
                className="w-full"
            />
            <Input 
                device={device}
                name="title"
                placeholder="제목을 입력해 주세요"
                value={form.title}
                onChange={handleInputChange}
                className="w-full"
            />

            {/* 에디터 영역 */}
            <div className="min-h-[480px] mb-[40px] text-black">
                <CustomEditor 
                    value={form.content} 
                    onChange={handleEditorChange} 
                />
            </div>

            <div className="w-full h-px bg-white mt-[20px]" />

            <div className="flex justify-end gap-[10px] mt-[20px] mb-[40px]">
              <Button variant="black" size="sm" className="w-[80px]" onClick={() => setIsCancelAlertOpen(true)}>
                취소
              </Button>
              <Button variant="black" size="sm" className="w-[80px]" onClick={() => setIsSaveAlertOpen(true)}>
                저장
              </Button>
            </div>
          </div>

          <ConfirmAlert
            device="mo"
            type="cancel"
            isOpen={isCancelAlertOpen}
            onConfirm={handleCancelConfirm}
            onCancel={() => setIsCancelAlertOpen(false)}
          />

          <ConfirmAlert
            device="mo"
            type="save"
            isOpen={isSaveAlertOpen}
            onConfirm={handleSavetConfirm}
            onCancel={() => setIsSaveAlertOpen(false)}
          />
        </div>
      </main>
    );
  }

  return null;
}