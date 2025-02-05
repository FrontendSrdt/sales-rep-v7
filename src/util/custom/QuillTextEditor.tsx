import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useCharacterLimit } from "../../hooks/useCharacterLimit";

interface MyStatefulEditorProps {
  markup: string;
  onChange: (value: string) => void;
  maxLimit: number;
}

const QuillTextEditor: React.FC<MyStatefulEditorProps> = ({ markup, onChange, maxLimit }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const { charCount, error, updateCharCount } = useCharacterLimit(maxLimit);

  // Initialize Quill editor
  useEffect(() => {
    console.log("Effect running");
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [[{ header: [1, 2, false] }], ["bold", "italic", "underline", "strike"], [{ list: "ordered" }, { list: "bullet" }], ["link", "blockquote", "code-block"]],
        },
      });
      console.log("Quill initialized:", quillRef.current);

      // Handle content change
      quillRef.current.on("text-change", () => {
        if (!quillRef.current) return;

        const text = quillRef.current.getText(); // Plain text content
        const html = quillRef.current.root.innerHTML; // Full HTML content
        const result = updateCharCount(text.trim()); // Enforce character limit

        console.log("Plain text content:", text); // Log plain text content
        console.log("HTML content:", html); // Log HTML content

        if (result.isValid) {
          onChange(html); // Notify parent with valid content
        } else {
          // Rollback excess characters
          quillRef.current.deleteText(result.validText.length, text.length - result.validText.length);
        }
      });
    }
  }, [onChange, updateCharCount]);

  // Update editor when `markup` changes
  // useEffect(() => {
  //   if (quillRef.current || markup) {
  //     const currentContent = quillRef.current.root.innerHTML;
  //     if (markup !== currentContent) {
  //       quillRef.current.clipboard.dangerouslyPasteHTML(markup); // Update editor with new markup
  //     }
  //   }
  // }, [markup]);

  useEffect(() => {
    if (quillRef.current) {
      if (markup) {
        const currentContent = quillRef.current.root.innerHTML;
        if (markup !== currentContent) {
          quillRef.current.clipboard.dangerouslyPasteHTML(markup);
        }
      } else {
        // Reset editor content if markup is empty
        quillRef.current.root.innerHTML = "";
      }
    }
  }, [markup]);

  return (
    <div>
      <div ref={editorRef} style={{ minHeight: "200px" }} />
      <div className="mt-2">
        <span>
          {charCount}/{maxLimit} characters
        </span>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default QuillTextEditor;
