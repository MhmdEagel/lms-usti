"use client";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { cn } from "@/lib/utils";
import { EditorState } from "lexical";
import { ListItemNode, ListNode } from "@lexical/list";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import ToolbarPlugin from "./ToolbarPlugin/ToolbarPlugin";
import { $generateHtmlFromNodes } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const theme = {};

function onError(error: Error) {
  console.error(error);
}

interface EditorProps {
  value?: string; 
  onChange: (value: string) => void;
  isInvalid: boolean;
}

export default function ContentEditor(props: EditorProps) {
  const { onChange, isInvalid } = props;

  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes: [ListNode, ListItemNode],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ToolbarPlugin />
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            className={cn(
              "editor placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input min-h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
            )}
            aria-invalid={isInvalid}
            placeholder={
              <div className="absolute top-12 pl-3 text-sm opacity-60 select-none overflow-hidden pointer-events-none">
                Masukkan konten pengumuman disini...
              </div>
            }
            aria-placeholder="Masukkan konten pengumuman disini..."
          />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <ListPlugin />
      <EditorOnChangePlugin onChange={onChange} />
    </LexicalComposer>
  );
}

interface EditorOnChangeProps {
  onChange: (value: string) => void;
}

function EditorOnChangePlugin(props: EditorOnChangeProps) {
  const [editor] = useLexicalComposerContext();
  const { onChange } = props;

  return (
    <OnChangePlugin
      onChange={(editorState: EditorState) => {
        // Perform actions when the editor state changes, e.g., save content
        editorState.read(() => {
          const htmlString = $generateHtmlFromNodes(editor, null);
          onChange(htmlString);
        });
      }}
    />
  );
}
