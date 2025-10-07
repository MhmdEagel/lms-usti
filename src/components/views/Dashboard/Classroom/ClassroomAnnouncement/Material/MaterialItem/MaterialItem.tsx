import { Card, CardHeader } from "@/components/ui/card";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/id";
import Link from "next/link";
import { Book } from "lucide-react";

export default function MaterialItem({
  materialId,
  title,
  createdAt,
}: {
  materialId: string;
  title: string;
  createdAt: Date;
}) {

  dayjs.extend(localizedFormat);
  dayjs.locale("id");


  return (
    <Link href={`./materi/${materialId}`}>
      <Card className="py-4 cursor-pointer">
        <CardHeader className="flex gap-4 items-center">
          <div className="rounded-full bg-accent p-4">
            <Book />
          </div>
          <div>
            <div className="font-bold">{title}</div>
            <div>{dayjs(createdAt).format("lll")}</div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
