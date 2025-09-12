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
          dosen: true,
        },
      },
    },
  });
  return data;
};

export const getAllClassroomDetailsBySlug = async (slug: string) => {
  const omitOptions = {
    updatedAt: true,
    createdAt: true,
    email: true,
    emailVerified: true,
    password: true,
    role: true,
  };
  const data = await prisma.kelas.findUnique({
    where: {
      slug,
    },
    include: {
      dosen: {
        omit: omitOptions
      },
      mahasiswa: {
        omit: omitOptions,
      },
    },
  });
  return data;
};

export const getClassroomDetailBySlug = async (slug: string) => {
  const omitOptions = {
    updatedAt: true,
    createdAt: true,
    email: true,
    emailVerified: true,
    password: true,
    role: true,
  };

  const data = await prisma.kelas.findUnique({
    where: {
      slug
    },
    include: {
      dosen: {
        omit: omitOptions
      }
    },
  })
  return data;
}

export const getClassroomDosenBySlug = async (slug: string) => {
  const data = await prisma.kelas.findUnique({
    where: {
      slug
    },
    select: {
      dosen: true
    }
  })
  return data
}

export const getClassroomMahasiswaBySlug = async (slug: string) => {
  const data = await prisma.kelas.findUnique({
    where: {
      slug
    },
    select: {
      mahasiswa: true
    }
  })
  return data?.mahasiswa
}
