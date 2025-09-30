import { prisma } from "@/lib/db";

export const getAllMateriByClassId = async (classId: string) => {
  const data = await prisma.materi.findMany({
    where: {
      kelasId: classId,
    },
  });
  return data
};

export const getAllLinkMateriByMateriId = async (materiId: string) => {
    const data = await prisma.linkMateri.findMany({
        where: {
            materiId
        }
    })
    return data;
}


export const getAllFileMateriByMateriId = async (materiId: string) => {
    const data = await prisma.fileMateri.findMany({
        where: {
            materiId
        }
    })
    return data
}
