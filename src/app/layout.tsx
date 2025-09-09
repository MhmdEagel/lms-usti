import "./globals.css";
import { Providers } from "@/providers/providers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "LMS USTI",
    template: "LMS | %s",
  },
  description:
    "LMS USTI merupakan sistem manajemen pembelajaran yang dikhususkan untuk menunjang kegiatan akademik di kampus Universitas Sains Dan Teknologi Indonesia.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
