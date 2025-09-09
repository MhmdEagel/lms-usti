"use server";

import nodemailer from "nodemailer";
import {render} from "@react-email/components";
import VerificationEmail from "@/components/views/Auth/Email/VerificationEmail/VerificationEmail";
import ResetPasswordEmail from "@/components/views/Auth/Email/ResetPasswordEmail/ResetPasswordEmail";

export async function sendVerificationEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
  const emailHtml = await render(<VerificationEmail token={token} />)
  await transporter.sendMail({
    from: process.env.GMAIL_USERNAME,
    to: email,
    subject: "LMS USTI | Verifikasi Email Anda",
    html: emailHtml,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
  const emailHtml = await render(<ResetPasswordEmail token={token} />)

  await transporter.sendMail({
    from: process.env.GMAIL_USERNAME,
    to: email,
    subject: "LMS USTI | Reset Password Anda",
    html: emailHtml,
  });

}
