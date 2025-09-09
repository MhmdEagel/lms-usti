import { prisma } from "@/lib/db";

export const getAllClassroomByDosenId = async (dosenId: string) => {
  const data = await prisma.kelas.findMany({
    where: {
      dosenId: dosenId,
    },
    include: {
      dosen: true,
    },
  });
  return data;
};

export const getAllClassroomByMahasiswaId = async (mahasiswaId: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id: mahasiswaId,
    },
    include: {
      kelasMahasiswa: {
        include: {
          dosen: true
        }
      },
    },
  });
  return data;
};

export const getClassroomBySlug = async (slug: string) => {
  const data = await prisma.kelas.findUnique({
    where: {
      slug,
    },
    include: {
      dosen: true,
      mahasiswa: {
        omit: {
          updatedAt: true,
          createdAt: true,
          email: true,
          emailVerified: true,
          password: true,
          role: true
        }
      },
    }
  });
  return data;
};
