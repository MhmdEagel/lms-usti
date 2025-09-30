"use server";

import { prisma } from "@/lib/db";
import { INewMaterial } from "@/types/Kelas";
import { writeFileSync } from "fs";
import path from "path";

export const newMaterial = async (dataInput: INewMaterial, kelasId: string) => {
  const { title, description, linkMateri, pdfMateri } = dataInput;
  const uploadedLink = linkMateri?.map((item) => ({ linkUrl: item }));
  const uploadedFiles = [];

  if (pdfMateri) {
    for (const file of pdfMateri) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filePath = path.join("dir/materi", file.name);
      writeFileSync(filePath, buffer);
      uploadedFiles.push({
        fileUrl: filePath,
      });
    }
  }

  try {
    await prisma.materi.create({
      data: {
        title,
        description,
        kelas: {
          connect: { id: kelasId },
        },
        fileMateri: {
          create: uploadedFiles,
        },
        linkMateri: {
          create: uploadedLink,
        },
      },
    });
    return {success: "Berhasil menambahkan materi", error: null}
  } catch (e) {
    console.error((e as Error).message)
    return {success: null, error: "Terjadi Kesalahan"}
  } 
};
