import { useEditPost, usePostForm } from '@/atom';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
// import dynamic from "next/dynamic";
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface QuillEditorProps {
  value: string,
  onChange: (value: string) => void;
}

const QuillEditorUpdate: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  const { postForm, setPostForm } = usePostForm();
  const { editPost, setEditPost } = useEditPost();
  // Customize Quill modules and formats as needed
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      // [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      // [{ direction: 'rtl' }],
      // [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      // [{ color: [] }, { background: [] }],
      // [{ font: [] }],
      // [{ align: [] }],
      ['link'],
      ['clean'],
    ],
  };

  return (
    <ReactQuill
      theme="snow"
      onChange={onChange}
      modules={modules}
      value={editPost.content}
      placeholder={"Write something awesome..."}
    />
  );
};

export default QuillEditorUpdate;
