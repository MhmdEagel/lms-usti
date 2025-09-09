import z from "zod";

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email wajib diisi" })
    .email("Email tidak sesuai")
    // .regex(
    //   /^[a-zA-Z0-9._%+-]+@sar\.ac\.id$/,
    //   "Email harus menggunakan domain @sar.ac.id"
    // )
    ,
  password: z
    .string({ required_error: "Password wajib diisi" })
    .min(1, "Password tidak boleh kosong"),
});

const resetSchema = z.object({
  email: z
    .string({ required_error: "Email wajib diisi" })
    .email("Email tidak sesuai")
    .regex(
      /^[a-zA-Z0-9._%+-]+@sar\.ac\.id$/,
      "Email harus menggunakan domain @sar.ac.id"
    ),
});

const registerSchema = z
  .object({
    fullname: z.string({ required_error: "Nama lengkap wajib diisi" }),
    email: z
      .string({ required_error: "Email wajib diisi" })
      .email("Email tidak sesuai")
      // .regex(  
      //   /^[a-zA-Z0-9._%+-]+@sar\.ac\.id$/,
      //   "Email harus menggunakan domain @sar.ac.id"
      // )
      ,
    password: z
      .string({ required_error: "Password wajib diisi" })
      .min(8, "Password minimal 8 karakter")
      .regex(
        /^(?=.*[A-Z])(?=.*\d).+$/,
        "Password harus mengandung minimal satu huruf besar dan satu angka"
      ),
    confirmPassword: z.string({
      required_error: "Konfirmasi password wajib diisi",
    }),
    role: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sama",
    path: ["confirmPassword"],
  });

const newPasswordSchema = z.object({
  password: z
    .string({ required_error: "Password wajib diisi" })
    .min(8, "Password minimal 8 karakter")
    .regex(
      /^(?=.*[A-Z])(?=.*\d).+$/,
      "Password harus mengandung minimal satu huruf besar dan satu angka"
    ),
  confirmPassword: z.string({
    required_error: "Konfirmasi password wajib diisi",
  }),
});

const newClassroomSchema = z.object({
  class_name: z.string({required_error: "Nama Kelas wajib diisi"}),
  room_number: z.coerce.number({required_error: "Ruang wajib diisi"}).nonnegative("Ruang tidak boleh negatif"),
  day: z.coerce.number({required_error: "Hari wajib dipilih"}),
  time_start: z.string({required_error: "Jam mulai kelas wajib diisi"}),
  time_end: z.string({required_error: "Jam selesai kelas wajib diisi"})
}).refine((data) => {
  return data.time_start < data.time_end
}, {
  message: "Jam selesai kelas harus lebih besar dari jam mulai kelas",
  path: ["time_end"],
})

const joinClassroomSchema = z.object({
  classroom_code: z.string().min(4, "Kode kelas wajib diisi"),
});

export {
  loginSchema,
  registerSchema,
  resetSchema,
  newPasswordSchema,
  joinClassroomSchema,  
  newClassroomSchema
};
