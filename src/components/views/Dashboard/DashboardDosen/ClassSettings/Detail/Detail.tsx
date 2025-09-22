"use client";

import { cn } from "@/lib/utils";
import { useDetail } from "./useDetail";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CLASS_DAYS from "@/constants/ClassDays.constant";
import { Button } from "@/components/ui/button";
import { Kelas } from "@prisma/client";

export default function Detail({classId, classDetail}: {classId: string; classDetail: Kelas}) {
  const { editForm, handleEdit } = useDetail(classId, classDetail);
  console.log(classDetail)
  return (
    <Form {...editForm}>
      <form onSubmit={editForm.handleSubmit(handleEdit)}>
        <div
          className={cn("flex flex-col gap-4", {
            "gap-2": Object.keys(editForm.formState.errors).length > 0,
          })}
        >
          <FormField
            control={editForm.control}
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
            control={editForm.control}
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
            control={editForm.control}
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
            control={editForm.control}
            name="time_end"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Waktu Selesai</FormLabel>
                <FormControl>
                  <Input type="time" placeholder="Waktu Selesai" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={editForm.control}
            name="day"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hari Kelas</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          <Button className="ml-auto" type="submit">Simpan</Button>
        </div>
      </form>
    </Form>
  );
}
