import getCurrentUser from "@/lib/auth";
import { createReadStream, existsSync, } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(
  request: Request,
  res: Response,
  { params }: { params: Promise<{ kelasId: string; fileId: string }> }
) {
  const { kelasId, fileId } = await params;
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({message: "Unauthorized"}, { status: 500 });
  }

  const filePath = path.join("dir", kelasId, fileId)

  if(!existsSync(filePath)) {
    return NextResponse.json({message: "File tidak ditemukan"}, {status: 404})
  }
  
  const readStream = createReadStream(filePath);
  return new NextResponse(readStream as any , {
    headers: {
      "Content-Type": "application/pdf",
    }
  })



}
