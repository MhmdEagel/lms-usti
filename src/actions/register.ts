"use server";

import { getUserByEmail } from "@/data/user";
import { prisma } from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { IRegister } from "@/types/Auth";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { sendVerificationEmail } from "./sendEmail";

const registerUser = async (data: IRegister) => {
  const { fullname, email, password, role } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(role)

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    throw new Error("Email sudah digunakan.");
  }

  await prisma.user.create({
    data: {
      fullname,
      email,
      password: hashedPassword,
      role: role as Role,
    },
  });

  
  
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  redirect("/auth/register/success");
};

export { registerUser };
