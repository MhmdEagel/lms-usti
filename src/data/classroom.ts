import { prisma } from "@/lib/db";

export const getAllClassroomByDosenId = async (dosenId?: string) => {
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


export const getClassroomGeneralDetailByClassId = async (classId: string) => {
  const data = await prisma.kelas.findUnique({
    where: {
      id: classId
    },
  })
  return data;
}

export const getAllClassroomByMahasiswaId = async (mahasiswaId?: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id: mahasiswaId,
    },
    select: {
      kelasMahasiswa: {
        include: {
          dosen: true,
        },
      },
    },
  });
  return data?.kelasMahasiswa;
};

export const getAllClassroomDetailsByClassId = async (classId: string) => {
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
      id: classId,
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

export const getClassroomDetailByClassId = async (classId: string) => {
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
      id: classId
    },
    include: {
      dosen: {
        omit: omitOptions
      }
    },
  })
  return data;
}

export const getClassroomDosenByClassId = async (classId: string) => {
  const data = await prisma.kelas.findUnique({
    where: {
      id: classId
    },
    select: {
      dosen: true
    }
  })
  return data
}

export const getClassroomMahasiswaByClassId = async (classId: string) => {
  const data = await prisma.kelas.findUnique({
    where: {
      id: classId
    },
    select: {
      mahasiswa: true,
      dosen: true
    }
  })
  return {mahasiswa: data?.mahasiswa, dosen: data?.dosen}
}



export const getClassroomAnnouncementByClassId = async (classId: string) => {
  const data = await prisma.kelas.findUnique({
    where: {
      id: classId
    },
    select: {
      pengumuman: {
        include: {
          user: true
        }
      }
    },
  })
  return data?.pengumuman
}
