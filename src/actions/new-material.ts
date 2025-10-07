"use server";

import { prisma } from "@/lib/db";
import { INewMaterial } from "@/types/Kelas";
import { mkdirSync, writeFileSync } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const newMaterial = async (dataInput: INewMaterial, kelasId: string) => {
  const { title, description, linkMateri, pdfMateri } = dataInput;
  const uploadedLink = linkMateri?.map((item) => ({
    linkName: item.linkName,
    linkUrl: item.linkUrl,
  }));
  const uploadedFiles = [];

  const kelas = await prisma.kelas.findUnique({
    where: {
      id: kelasId,
    },
  });

  if (!kelas) return { success: null, error: "Kelas tidak ditemukan" };
  const uuid = uuidv4().replace(/-/g, "");
  const fileUuid = uuid.slice(0, 10);

  if (pdfMateri) {
    for (const file of pdfMateri) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const serverFilePath = `./dir/materi/${kelas.id}`;
      const filePath = path.join(serverFilePath, `${fileUuid}.pdf`);

      mkdirSync(serverFilePath, { recursive: true });
      writeFileSync(filePath, buffer);

      uploadedFiles.push({
        id: fileUuid,
        fileName: file.name,
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
          connect: { id: kelas.id },
        },
        fileMateri: {
          create: uploadedFiles,
        },
        linkMateri: {
          create: uploadedLink,
        },
      },
    });
    return { success: "Berhasil menambahkan materi", error: null };
  } catch (e) {
    console.error((e as Error).message);
    return { success: null, error: "Terjadi Kesalahan" };
  }
};
