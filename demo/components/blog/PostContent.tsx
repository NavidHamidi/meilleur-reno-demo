"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function PostContent({ content }: { content: object }) {
  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    extensions: [StarterKit],
    content,
    editorProps: {
      attributes: {
        class: [
          "prose prose-lg max-w-none",
          // Titres
          "prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground",
          "prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4",
          "prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3",
          // Paragraphes
          "prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-5",
          // Liens
          "prose-a:text-primary prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-primary/80",
          // Listes
          "prose-ul:my-4 prose-ol:my-4 prose-li:my-1",
          "prose-li:text-foreground",
          // Blockquote
          "prose-blockquote:border-l-4 prose-blockquote:border-primary/40",
          "prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:text-muted-foreground",
          // Code
          "prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm",
          "prose-pre:bg-muted prose-pre:rounded-xl prose-pre:p-4",
          // Strong / em
          "prose-strong:font-semibold prose-strong:text-foreground",
        ].join(" "),
      },
    },
  });

  return <EditorContent editor={editor} />;
}