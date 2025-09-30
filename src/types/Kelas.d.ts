interface IClassroom {
  class_name: string;
  room_number: number;
  day: number;
  time_start: string;
  time_end: string;
}

interface INewClassroom {
  class_name: string;
  room_number: number;
  day: number;
  semester: number;
  time_start: string;
  time_end: string;
}

interface IEditClassroom {
  class_name: string;
  room_number: number;
  day: string;
  time_start: string;
  time_end: string;
}

interface Mahasiswa {
  id: string;
  fullname: string;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  password: string;
  role: $Enums.Role;
  createdAt: Date;
  updatedAt: Date;
}

interface IPengumuman {
  title: string;
  content: string;
}

interface INewMaterial {
  title: string;
  pdfMateri?: File[] | undefined;
  description?: string | null | undefined;
  linkMateri?: string[] | undefined;
}

export type {
  IClassroom,
  Mahasiswa,
  INewClassroom,
  IPengumuman,
  IEditClassroom,
  INewMaterial,
};
