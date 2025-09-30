"use client";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { cn } from "@/lib/utils";
import { EditorState, FORMAT_TEXT_COMMAND } from "lexical";
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, ListItemNode, ListNode } from "@lexical/list";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { $generateHtmlFromNodes } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { Toggle } from "./toggle";
import { Bold, Italic, List, ListOrdered } from "lucide-react";
import { Button } from "./button";

const theme = {};

function onError(error: Error) {
  console.error(error);
}

interface EditorProps {
  value?: string; 
  onChange: (value: string) => void;
  isInvalid: boolean;
  placeholder?: string;
}

export default function ContentEditor(props: EditorProps) {
  const { onChange, isInvalid, placeholder } = props;

  const initialConfig = {
    namespace: "ContentEditor",
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
                {placeholder ?? "Masukkan konten disini..."}
              </div>
            }
            aria-placeholder={placeholder ?? "Masukkan konten disini..."}
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

function ToolbarPlugin() {
    const [editor] = useLexicalComposerContext();


  function addListAction() {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  }

  function addOrderedListAction() {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
  }

  const boldAction = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
  };

  const italicAction = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
  };

  return (
    <div className="mb-2 space-x-2">
      <Tooltip>
        <Toggle asChild variant={"outline"} onClick={boldAction}>
          <TooltipTrigger>
            <Bold />
          </TooltipTrigger>
        </Toggle>
        <TooltipContent>
          <p>Bold</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <Toggle asChild variant={"outline"} onClick={italicAction}>
          <TooltipTrigger>
            <Italic />
          </TooltipTrigger>
        </Toggle>
        <TooltipContent>
          <p>Italic</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <Button asChild variant={"outline"} type="button" onClick={addListAction}>
          <TooltipTrigger>
            <List />
          </TooltipTrigger>
        </Button>
        <TooltipContent>
          <p>Unordered List</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <Button asChild variant={"outline"} type="button" onClick={addOrderedListAction}>
          <TooltipTrigger>
            <ListOrdered />
          </TooltipTrigger>
        </Button>
        <TooltipContent>
          <p>Ordered List</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
  
}
