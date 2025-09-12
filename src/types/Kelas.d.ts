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



export type { IClassroom, Mahasiswa, INewClassroom };
