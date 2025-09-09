import Image from "next/image";

export default function ResetPasswordSuccess() {
  return (
    <div className="flex flex-col items-center justify-center w-full shadow-sm">
      <Image
        src={"/images/ilustration/email-sent.svg"}
        width={400}
        height={400}
        alt="Email Sent"
      />
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="mb-1 text-3xl font-bold text-primary">
            Verifikasi Email
          </h1>
          <p className="text-xl">Email Verifikasi berhasil dikirim</p>
          <p className="text-lg text-gray-500">
            Cek email anda untuk melakukan reset password.
          </p>
        </div>
      </div>
    </div>
  );
}
