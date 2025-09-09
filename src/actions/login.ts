"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { ILogin } from "@/types/Auth";
import { AuthError } from "next-auth";

const loginUser = async (data: ILogin) => {
  const { email, password } = data;
  const user = await getUserByEmail(email);


  if (!user || !user.email || !user.password) {
    throw new Error("Email tidak ditemukan")
  }

  if (!user.emailVerified) {
    throw new Error("Email belum diverifikasi. Cek email atau spam anda.")
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo:
        user?.role === "MAHASISWA"
          ? "/mahasiswa"
          : "/dosen",
    });
  } catch (error) {
    
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Email atau password salah.");
        default:
          throw new Error("Terjadi Kesalahan");
      }
    }    throw error;
  }
};

export default loginUser;
