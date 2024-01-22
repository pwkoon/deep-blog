import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
// import dynamic from "next/dynamic";
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface QuillEditorProps {
  // value: string,
  onChange: (value: string) => void;
}

const QuillEditorCreate: React.FC<QuillEditorProps> = ({ onChange }) => {
  // const { postForm, setPostForm } = usePostForm();
  // Customize Quill modules and formats as needed
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <ReactQuill
      theme="snow"
      onChange={onChange}
      modules={modules}
      // value={postForm.content}
      placeholder={"Write something awesome..."}
    />
  );
};

export default QuillEditorCreate;
