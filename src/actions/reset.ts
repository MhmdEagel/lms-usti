"use server";

import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/tokens";
import { IResetPassword } from "@/types/Auth";
import { sendPasswordResetEmail } from "./sendEmail";
import { redirect } from "next/navigation";

export const resetPassword = async (data: IResetPassword) => {
  const { email } = data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) throw Error("Email tidak ditemukan.");

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );
  
  redirect("/auth/reset-password/success");
};
