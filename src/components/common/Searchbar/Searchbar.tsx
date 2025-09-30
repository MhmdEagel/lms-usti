"use client";

import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SearchField,
  SearchFieldClear,
  SearchFieldInput,
} from "@/components/ui/searchfield";
import { SearchIcon, SlidersHorizontal, XIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function Searchbar() {
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div className="w-full mb-4 bg-accent py-4">
      <form className="flex justify-center gap-3 items-center">
        <SearchField className="max-w-lg w-full">
          <FieldGroup className={"h-9"}>
            <SearchIcon aria-hidden className="size-4 text-muted-foreground" />
            <SearchFieldInput name="class_name" placeholder="Cari Kelas....." />
            <SearchFieldClear>
              <XIcon aria-hidden className="size-4" />
            </SearchFieldClear>
          </FieldGroup>
        </SearchField>
        <Button
        variant={"outline"}
          type="button"
          onClick={() => {
            setOpenFilter((prevValue) => !prevValue);
          }}
        >
          <SlidersHorizontal />
          Filter
        </Button>
      </form>
      {openFilter ? (
        <div className="px-4 mt-8">
          <form className="flex items-center justify-center space-y-4 gap-4 border">
            <div className="grid gap-3">
              <Label>Semester</Label>
              <Input name="semester" type="number" className="bg-white" />
            </div>
            <div className="space-x-2">
              <Button>Cari</Button>
              <Link href={"/dosen/kelas"}>
                <Button variant={"outline"}>Hapus Filter</Button>
              </Link>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
