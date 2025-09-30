"use client";

import { Dispatch, useRef, useState } from "react";
import { Button } from "./button";
import { Book, FileText, Link, Plus, Upload, X } from "lucide-react";
import { Card, CardContent, CardHeader } from "./card";
import { useForm, UseFormSetValue } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newMaterialSchema } from "@/schemas/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import ContentEditor from "./content-editor";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { toast } from "sonner";
import { INewMaterial } from "@/types/Kelas";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { isValidUrl } from "@/lib/utils";
import { newMaterial } from "@/actions/new-material";

export default function InputDialog({ classId }: { classId: string }) {
  const [open, setOpen] = useState(false);
  const [arrayOfFiles, setArrayOfFiles] = useState<File[]>([]);
  const [arrayOfLinks, setArrayOfLinks] = useState<string[]>([]);
  const [isPending, setIsPending] = useState(false);
  const materialForm = useForm({
    defaultValues: {
      pdfMateri: arrayOfFiles,
    },
    resolver: zodResolver(newMaterialSchema),
  });
  const pdfMateriRef = useRef<HTMLInputElement>(null);
  const handleMaterialForm = async (data: INewMaterial) => {
    setIsPending(true);
    const res = await newMaterial(data, classId);

    if (!res.success && res.error) {
      toast.error(res.error);
      setIsPending(false);
      return;
    }
    setIsPending(false);
    toast.success(res.success);
    setArrayOfFiles([]);
    setArrayOfLinks([]);
    setOpen(false);
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger className="ml-auto" asChild>
          <Button onClick={() => setOpen(true)} type="button" size={"icon"}>
            <Plus />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Buat Materi</p>
        </TooltipContent>
      </Tooltip>
      {open ? (
        <div
          data-state={open ? "open" : "closed"}
          className="fixed z-50 top-0 right-0 left-0 bottom-0 bg-white p-4 space-y-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 overflow-y-auto"
        >
          <div className="sticky top-0 left-0 right-0 z-60 bg-white px-4 flex items-center gap-4 border-b-[3px] pb-4">
            <Button
              onClick={() => {
                materialForm.reset();
                setOpen(false);
              }}
              type="button"
              variant={"secondary"}
            >
              <X />
            </Button>
            <Book />
            <div className="text-xl">Buat Materi</div>
            <Button
              disabled={isPending}
              type="button"
              onClick={() => materialForm.handleSubmit(handleMaterialForm)()}
              className="ml-auto"
            >
              Posting
            </Button>
          </div>
          <Form {...materialForm}>
            <form className="space-y-4 max-w-xl mx-auto mt-4">
              <Card className="max-w-lg mx-auto">
                <CardHeader>
                  <div className="font-bold">Detail Kelas</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={materialForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Judul</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Judul materi..."
                            {...field}
                            value={field.value ?? ""}
                            autoComplete="off"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={materialForm.control}
                    name="description"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Deskripsi (Optional)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <ContentEditor
                              placeholder="Masukkan deskripsi..."
                              onChange={field.onChange}
                              isInvalid={!!fieldState.error}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={materialForm.control}
                    name="pdfMateri"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem className="hidden">
                        <FormControl>
                          <Input
                            {...fieldProps}
                            ref={pdfMateriRef}
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => {
                              if (
                                e.target.files &&
                                e.target.files![0].type !== "application/pdf"
                              ) {
                                toast.error("File harus berupa pdf");
                                e.target.value = "";
                                return;
                              }
                              const newFiles = [
                                ...arrayOfFiles,
                                e.target.files![0],
                              ];
                              setArrayOfFiles(newFiles);
                              onChange(newFiles);
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card className="max-w-xl mx-auto">
                <CardHeader>
                  <div className="font-bold">Lampiran</div>
                </CardHeader>
                <CardContent>
                  {arrayOfFiles.length > 0 ? (
                    <Card className="mb-4">
                      <CardHeader>
                        <div>File</div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col gap-2">
                          {arrayOfFiles.map((item, index) => {
                            return (
                              <FileItem
                                arrayOfFiles={arrayOfFiles}
                                setValue={materialForm.setValue}
                                setArrayOfFiles={setArrayOfFiles}
                                key={index}
                                index={index}
                                fileName={item.name}
                              />
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  ) : null}
                  {arrayOfLinks.length > 0 ? (
                    <Card className="mb-4">
                      <CardHeader>
                        <div>Link</div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col gap-2 ">
                          {arrayOfLinks.map((item, index) => (
                            <LinkItem
                              key={index}
                              index={index}
                              arrayOfLinks={arrayOfLinks}
                              setArrayOfLinks={setArrayOfLinks}
                              linkName={item}
                              setValue={materialForm.setValue}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ) : null}

                  <div className="flex justify-center gap-4">
                    <div className="flex flex-col gap-2 items-center font-semibold text-sm">
                      <Button
                        onClick={() => pdfMateriRef.current?.click()}
                        type="button"
                        size={"icon"}
                      >
                        <Upload />
                      </Button>
                      Upload
                    </div>
                    <AddLinks
                      arrayOfLinks={arrayOfLinks}
                      setArrayOfLinks={setArrayOfLinks}
                      setValue={materialForm.setValue}
                    />
                  </div>
                </CardContent>
              </Card>
            </form>
          </Form>
        </div>
      ) : null}
    </>
  );
}

function FileItem({
  fileName,
  arrayOfFiles,
  setArrayOfFiles,
  setValue,
  index,
}: {
  fileName: string;
  arrayOfFiles: File[];
  setArrayOfFiles: Dispatch<React.SetStateAction<File[]>>;
  setValue: UseFormSetValue<INewMaterial>;
  index: number;
}) {
  const handleDelete = (index: number) => {
    const newArray = arrayOfFiles.splice(0, index);
    setArrayOfFiles(newArray);
    setValue("pdfMateri", newArray);
  };
  return (
    <div className="p-4 border rounded-lg flex">
      <div className="flex gap-2 items-center">
        <div className="rounded-full bg-gray-600 p-2">
          <FileText size={"24"} color="white" />
        </div>
        {fileName}
      </div>
      <Button
        onClick={() => handleDelete(index)}
        type="button"
        variant={"ghost"}
        className="rounded-full cursor-pointer ml-auto "
      >
        <X />
      </Button>
    </div>
  );
}

function LinkItem({
  linkName,
  arrayOfLinks,
  setArrayOfLinks,
  setValue,
  index,
}: {
  linkName: string;
  arrayOfLinks: string[];
  setArrayOfLinks: Dispatch<React.SetStateAction<string[]>>;
  setValue: UseFormSetValue<INewMaterial>;
  index: number;
}) {
  const handleDelete = (index: number) => {
    const newArray = arrayOfLinks.splice(0, index);
    setArrayOfLinks(newArray);
    setValue("linkMateri", newArray);
  };
  return (
    <div className="p-4 border rounded-lg flex">
      <div className="flex gap-2 items-center">
        <div className="rounded-full bg-gray-600 p-2">
          <FileText size={"24"} color="white" />
        </div>
        {linkName}
      </div>
      <Button
        onClick={() => handleDelete(index)}
        type="button"
        variant={"ghost"}
        className="rounded-full cursor-pointer ml-auto "
      >
        <X />
      </Button>
    </div>
  );
}

function AddLinks({
  setValue,
  arrayOfLinks,
  setArrayOfLinks,
}: {
  setValue: UseFormSetValue<INewMaterial>;
  arrayOfLinks: string[];
  setArrayOfLinks: Dispatch<React.SetStateAction<string[]>>;
}) {
  const [linkString, setLinkString] = useState("https://www.");
  const [open, setOpen] = useState(false);

  const handleAddLink = () => {
    if (!isValidUrl(linkString)) {
      toast.error("Link tidak valid");
      return;
    }
    const newArrayOfLinks = [...arrayOfLinks, linkString];
    setArrayOfLinks(newArrayOfLinks);
    setValue("linkMateri", newArrayOfLinks);
    setLinkString("https://www.");
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="flex flex-col gap-2 items-center font-semibold text-sm">
            <Button type="button" size={"icon"}>
              <Link />
            </Button>
            Link
          </div>
        </DialogTrigger>
        <DialogContent
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            const input = document.getElementById(
              "link-string"
            ) as HTMLInputElement;
            if (input) {
              const end = input.value.length;
              input.focus();
              input.setSelectionRange(end, end);
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>Upload Link</DialogTitle>
            <DialogDescription>
              Tambahkan link yang ingin diupload.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              id="link-string"
              type="text"
              value={linkString}
              onChange={(e) => {
                setLinkString(e.target.value);
              }}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                onClick={() => setLinkString("https://www.")}
                variant="outline"
              >
                Batal
              </Button>
            </DialogClose>
            <Button onClick={handleAddLink} type="button">
              Tambah Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
