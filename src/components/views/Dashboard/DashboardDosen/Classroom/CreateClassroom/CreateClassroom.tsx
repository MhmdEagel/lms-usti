"use client";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CLASS_DAYS from "../../../../../../constants/ClassDays.constant";
import { Input } from "@/components/ui/input";
import useCreateClassroom from "./useCreateClassroom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function CreateClassroom() {
  const {
    isPending,
    handleCreateClassroom,
    createClassForm,
    isOpen,
    handleCloseForm,
    setIsOpen,
  } = useCreateClassroom();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <SheetTrigger asChild>
            <Button className="rounded-full" size={"icon"} variant="default">
              <Plus />
            </Button>
          </SheetTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Buat Kelas</p>
        </TooltipContent>
      </Tooltip>
      <SheetContent
        resetForm={() => createClassForm.reset()}
        className="flex flex-col h-full"
      >
        <Form {...createClassForm}>
          <form
            className="flex flex-col h-full"
            onSubmit={createClassForm.handleSubmit(handleCreateClassroom)}
          >
            <SheetHeader>
              <SheetTitle>Buat Kelas</SheetTitle>
              <SheetDescription>
                Silahkan masukkan data yang diperlukan untuk membuat kelas anda.
              </SheetDescription>
            </SheetHeader>
            <div
              className={cn("px-4 space-y-4", {
                "space-y-2 mt-0":
                  Object.keys(createClassForm.formState.errors).length > 0,
              })}
            >
              <FormField
                control={createClassForm.control}
                name="class_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Kelas</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nama Kelas"
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={createClassForm.control}
                name="room_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Ruangan</FormLabel>
                    <FormControl>
                      <Input
                        min={1}
                        max={16}
                        autoComplete="off"
                        type="number"
                        placeholder="Nomor Ruangan"
                        inputMode="numeric"
                        pattern="[1-9]{1}"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={createClassForm.control}
                name="time_start"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Waktu Mulai</FormLabel>
                    <FormControl>
                      <Input type="time" placeholder="Waktu Mulai" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={createClassForm.control}
                name="time_end"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Waktu Selesai</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        placeholder="Waktu Selesai"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={createClassForm.control}
                name="day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hari Kelas</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Hari" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CLASS_DAYS.map((item) => (
                          <SelectItem key={item.id} value={item.value}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button onClick={handleCloseForm} variant="outline">
                  Batal
                </Button>
              </SheetClose>
              <Button type="submit">
                {isPending ? (
                  <Spinner color="white" variant="circle" />
                ) : (
                  "Simpan"
                )}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
