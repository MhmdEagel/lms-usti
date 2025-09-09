"use server";

import { getUserByEmail } from "@/data/user";
import { getVerifictaionTokenByToken } from "@/data/verification-token";
import { prisma } from "@/lib/db";

export const newVerification = async (token: string) => {
  const existingToken = await getVerifictaionTokenByToken(token);

  if (!existingToken) {
    return { error: "Token tidak tersedia" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email tidak ditemukan." };
  }

  if (hasExpired) {
    await prisma.verificationToken.delete({
      where: { id: existingToken.id },
    });
    await prisma.user.delete({
      where: { id: existingUser.id },
    });
    return { error: "Token sudah tidak berlaku." };
  }

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await prisma.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email berhasil diverifikasi", role: existingUser.role };
};
