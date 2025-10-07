import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { getMateriDetailByMateriId } from "@/data/materi";
import Image from "next/image";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/id";
import DOMPurify from "isomorphic-dompurify";
import getCurrentUser from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, File, Link as LinkIcon } from "lucide-react";
import { FileMateri, LinkMateri } from "@prisma/client";
import { getFileExtension, getFileName } from "@/lib/utils";
import Link from "next/link";
import ViewPdf from "../ViewPdf/ViewPdf";

export default async function MaterialDetail({
  materiId,
}: {
  materiId: string;
}) {
  const data = await getMateriDetailByMateriId(materiId);
  const user = await getCurrentUser();

  dayjs.extend(localizedFormat);
  dayjs.locale("id"); 

  if (!data) {
    return (
      <div className="p-4 flex flex-col justify-center items-center h-[100vh]">
        <Image
          width={300}
          height={300}
          src={"/images/ilustration/404.svg"}
          alt="Not Found Image"
        />
      </div>
    );
  }
  return (
    <div className="p-4 w-full max-w-5xl mx-auto">
      <Card>
        <CardHeader>
          <div className="font-bold text-gray-500 text-sm">JUDUL</div>
          <div className="text-xl font-bold">{data.title}</div>
          <div className="text-gray-500">
            {dayjs(data.createdAt).format("lll")}
          </div>
          {user?.role === "DOSEN" ? (
            <CardAction>
              <Button type="button" variant={"ghost"}>
                <EllipsisVertical size={800} />
              </Button>
            </CardAction>
          ) : null}
        </CardHeader>
        <CardContent>
          <div className="font-bold text-gray-500 text-sm">DESKRIPSI</div>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(data.description!),
            }}
          ></div>
          {data.fileMateri.length > 0 ? (
            <div className="mt-6">
              <div className="font-bold text-gray-500 text-sm uppercase">
                File Materi
              </div>
              <div className="grid grid-cols-2 gap-4">
                {data.fileMateri.map((item) => (
                  <FileMateriItem key={item.id} fileMateri={item} />
                ))}
              </div>
            </div>
          ) : null}
          {data.linkMateri.length > 0 ? (
            <div className="mt-6">
              <div className="font-bold text-gray-500 text-sm uppercase">
                Link Materi
              </div>
              <div className="grid grid-cols-2 gap-4">
                {data.linkMateri.map((item) => (
                  <LinkMateriItem key={item.id} linkMateri={item} />
                ))}
              </div>
            </div>
          ) : null}
        </CardContent>
        <ViewPdf />
      </Card>
    </div>
  );
}

function FileMateriItem({ fileMateri }: { fileMateri: FileMateri }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4">
        <div className="p-4  bg-accent rounded-full">
          <File />
        </div>
        <div className="space-y-2">
          <div>
            <div className="font-bold text-gray-500 text-sm">NAMA FILE</div>
            <div className="text-lg">{getFileName(fileMateri.fileName)}</div>
          </div>
          <div>
            <div className="font-bold text-gray-500 text-sm">TIPE</div>
            <div>{getFileExtension(fileMateri.fileName).toUpperCase()}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LinkMateriItem({ linkMateri }: { linkMateri: LinkMateri }) {
  return (
    <Link target="_blank" className="group" href={linkMateri.linkUrl}>
      <Card>
        <CardContent className="flex items-center gap-4">
          <div className="p-4  bg-accent rounded-full">
            <LinkIcon />
          </div>
          <div className="space-y-2">
            <div>
              <div className="font-bold text-gray-500 text-sm ">NAMA LINK</div>
              <div className="text-lg max-w-[350px] truncate group-hover:underline group-hover:text-blue-700">
                {linkMateri.linkName}
              </div>
            </div>
            <div>
              <div className="font-bold text-gray-500 text-sm">TIPE</div>
              <div>LINK</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
