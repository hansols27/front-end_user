'use client';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// [중요] 빌드 버전에 따라 SimpleUploadAdapter가 기본 포함되지 않았을 수 있으므로 
// 에러가 날 경우 이 부분 설정을 조정해야 합니다.
const Editor = ({ value, onChange }: { value: string; onChange: (data: string) => void }) => {
  return (
    <div className="custom-editor-wrapper text-black">
      <CKEditor
        editor={ClassicEditor as any}
        data={value}
        config={{
          placeholder: '내용을 입력하세요.',
          // 툴바에 'uploadImage' 버튼 추가
          toolbar: [
            'heading', '|', 'bold', 'italic', 'link', 'uploadImage', 'insertTable', '|',
            'bulletedList', 'numberedList', 'undo', 'redo'
          ],
          // 이미지 업로드 설정
          simpleUpload: {
            // 이미지를 받을 서버 API 주소 (본인의 API 경로로 수정하세요)
            uploadUrl: '/api/common/upload',
            // (선택) 요청 헤더에 토큰이 필요한 경우
            headers: {
              'X-CSRF-TOKEN': 'CSFR-Token',
              Authorization: 'Bearer <JSON Web Token>'
            }
          }
        }}
        onChange={(_, editor) => {
          onChange(editor.getData());
        }}
      />
    </div>
  );
};

export default Editor;