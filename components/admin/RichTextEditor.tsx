"use client";

import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { TableKit } from "@tiptap/extension-table";

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  initialMode?: "visual" | "source";
};

function ToolbarButton({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded px-2 py-1 text-[13px] font-medium ${
        active ? "bg-navy text-white" : "text-navy hover:bg-cream-dark"
      }`}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({ value, onChange, initialMode = "visual" }: RichTextEditorProps) {
  const [mode, setMode] = useState<"visual" | "source">(initialMode);
  const [source, setSource] = useState(value);

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
      }),
      Placeholder.configure({ placeholder: "Write the article…" }),
      TableKit.configure({ table: { resizable: false } }),
    ],
    content: value || "<p></p>",
    editorProps: {
      attributes: {
        class: "prose-article min-h-[360px] max-w-none px-4 py-3 focus:outline-none",
      },
    },
    onUpdate: ({ editor: instance }) => {
      onChange(instance.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value !== current && mode === "visual") {
      editor.commands.setContent(value || "<p></p>", { emitUpdate: false });
    }
  }, [value, editor, mode]);

  function switchMode(next: "visual" | "source") {
    if (next === mode) return;
    if (next === "source") {
      const html = editor?.getHTML() ?? value;
      setSource(html);
      onChange(html);
    } else if (editor) {
      editor.commands.setContent(source || "<p></p>");
      onChange(editor.getHTML());
    }
    setMode(next);
  }

  return (
    <div className="overflow-hidden rounded-lg border border-cream-dark bg-white">
      <div className="flex flex-wrap items-center gap-2 border-b border-cream-dark bg-cream-soft px-3 py-2">
        <div className="flex rounded-md border border-cream-dark bg-white p-0.5 text-sm">
          <button
            type="button"
            onClick={() => switchMode("visual")}
            className={`rounded px-3 py-1 ${mode === "visual" ? "bg-navy text-white" : "text-navy"}`}
          >
            Visual Editor
          </button>
          <button
            type="button"
            onClick={() => switchMode("source")}
            className={`rounded px-3 py-1 ${mode === "source" ? "bg-navy text-white" : "text-navy"}`}
          >
            Source Code (&lt;/&gt; HTML)
          </button>
        </div>
        {mode === "visual" && editor ? (
          <div className="flex flex-wrap items-center gap-1">
            <ToolbarButton active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
              Bold
            </ToolbarButton>
            <ToolbarButton active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
              Italic
            </ToolbarButton>
            <ToolbarButton
              active={editor.isActive("heading", { level: 2 })}
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
              Heading 2
            </ToolbarButton>
            <ToolbarButton
              active={editor.isActive("heading", { level: 3 })}
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            >
              Heading 3
            </ToolbarButton>
            <ToolbarButton
              active={editor.isActive("bulletList")}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              Bullet List
            </ToolbarButton>
            <ToolbarButton
              active={editor.isActive("orderedList")}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              Numbered List
            </ToolbarButton>
            <ToolbarButton
              active={editor.isActive("blockquote")}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
              Blockquote
            </ToolbarButton>
            <ToolbarButton
              onClick={() => {
                const url = window.prompt("Link URL");
                if (!url) return;
                editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
              }}
            >
              Insert Link
            </ToolbarButton>
            <ToolbarButton active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}>
              Inline Code
            </ToolbarButton>
            <ToolbarButton
              active={editor.isActive("codeBlock")}
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            >
              Code Block
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
            >
              Table Insert
            </ToolbarButton>
          </div>
        ) : null}
      </div>
      {mode === "visual" ? (
        <EditorContent editor={editor} />
      ) : (
        <textarea
          value={source}
          onChange={(event) => {
            setSource(event.target.value);
            onChange(event.target.value);
          }}
          spellCheck={false}
          className="min-h-[360px] w-full resize-y bg-navy-deep px-4 py-3 font-mono text-[13px] leading-6 text-cream outline-none"
        />
      )}
    </div>
  );
}
