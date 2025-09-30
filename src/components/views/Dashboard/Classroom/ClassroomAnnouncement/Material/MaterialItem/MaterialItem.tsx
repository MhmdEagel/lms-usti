import { Button } from "@/components/ui/button";
import { Card, CardAction, CardHeader } from "@/components/ui/card";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/id";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";

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
        <CardHeader>
          <div className="font-bold">{title}</div>
          <div>{dayjs(createdAt).format("lll")}</div>
          <CardAction>
            <Button type="button" variant={"ghost"}>
              <EllipsisVertical />
            </Button>
          </CardAction>
        </CardHeader>
      </Card>
    </Link>
  );
}
