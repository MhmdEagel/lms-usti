"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useAddAnnouncement from "./useAddAnnouncement";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus } from "lucide-react";
import ContentEditor from "./ContentEditor/ContentEditor";

export default function AddAnnouncement({
  userId,
  userRole,
  classId,
}: {
  userId: string | undefined;
  userRole: string | undefined;
  classId: string;
}) {
  const { form, open, handleOpen, handleAddAnnouncement } = useAddAnnouncement(
    classId,
    userRole!,
    userId!
  );

  return (
    <>
      <div className="pb-4 border-b-2 flex items-center">
        <div className="text-xl font-semibold">Pengumuman Kelas</div>
        {userRole === "DOSEN" && !open ? (
          <Tooltip>
            <TooltipTrigger className="ml-auto" asChild>
              <Button onClick={() => handleOpen(true)} size={"icon"}>
                <Plus />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tambahkan Pengumuman</p>
            </TooltipContent>
          </Tooltip>
        ) : null}
      </div>
      {open ? (
        <Card className="mt-4">
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(handleAddAnnouncement)}
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Judul</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Pengumuman"
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
                  name="content"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Konten</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <ContentEditor
                            value={field.value}
                            onChange={field.onChange}
                            isInvalid={!!fieldState.error}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2 justify-end">
                  <Button
                    onClick={() => {
                      handleOpen(false);
                      form.reset();
                    }}
                    variant={"outline"}
                  >
                    Batal
                  </Button>
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : null}
    </>
  );
}
