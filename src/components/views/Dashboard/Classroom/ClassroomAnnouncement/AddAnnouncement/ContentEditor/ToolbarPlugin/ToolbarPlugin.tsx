import {FORMAT_TEXT_COMMAND } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Bold, Italic, List, ListOrdered } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";




export default function ToolbarPlugin() {
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
