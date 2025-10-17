import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

import Quill from "quill";
import "quill/dist/quill.snow.css";

export type RichTextEditroHandle = {
  getContent: () => string;
};

const RichtextEditor = forwardRef<RichTextEditroHandle>((_, ref) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [
              { align: "" },
              { align: "center" },
              { align: "right" },
              { align: "justify" },
            ],
            ["link", "image"],
            ["clean"],
          ],
        },
        placeholder: "Write something awesome...",
      });
    }

    return () => {
      quillRef.current = null;
    };
  }, []);

  useImperativeHandle(ref, () => ({
    getContent: () => {
      if (quillRef.current) {
        return quillRef.current.root.innerHTML;
      }
      return "";
    },
  }));

  return <div ref={editorRef}></div>;
});

export default RichtextEditor;
