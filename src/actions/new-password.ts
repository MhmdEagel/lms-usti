"use server";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { prisma } from "@/lib/db";
import { INewPassword } from "@/types/Auth";
import bcryptjs from "bcryptjs";
import { redirect } from "next/navigation";

export const newPassword = async (
  data: INewPassword,
  token?: string | null,
) => {
  const { password } = data;

  if (!token)
    throw new Error("Token tidak ditemukan. silahkan cek email anda.");

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) throw new Error("Token Invalid");

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired)
    throw new Error("Token sudah tidak berlaku. lakukan reset password ulang.");

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) throw new Error("Email tidak ditemukan");

  const hashedPassword = await bcryptjs.hash(password, 10);

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await prisma.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  redirect(`/auth/new-password/success?role=${existingUser.role.toLowerCase()}`);
};
