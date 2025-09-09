import Image from "next/image";
import GabungKelas from "./GabungKelas/GabungKelas";
import { Toaster } from "@/components/ui/sonner";


export default function Kelas() {
 
  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <Image
          src={"/images/ilustration/empty-class.svg"}
          alt="Kelas Kosong"
          width={250}
          height={250}
        />
        <div className="text-center">
          <h2 className="text-2xl text-primary font-bold">Tidak ada kelas</h2>
          <p className="mb-2 text-gray-500">
            Sepertinya kamu belum gabung ke kelas manapun.
          </p>
          <GabungKelas />
        </div>
      </div>
    </>
  );
}
