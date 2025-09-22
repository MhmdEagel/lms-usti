import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User } from "@prisma/client";
import { User as UserIcon } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";   
import DeleteAction from "./DeleteAction/DeleteAction";

export default function AnnouncementItem({
  user,
  content,
  annId,
}: {
  user: User;
  content: string;
  annId: string;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <div className="flex gap-2 items-center">
            <Avatar className="size-10">
              <AvatarFallback>
                <UserIcon />
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-primary font-bold">{user.fullname}</div>
              <div className="capitalize">{user.role.toLowerCase()}</div>
            </div>
          </div>
          <DeleteAction annId={annId} />
        </div>
      </CardHeader>
      <CardContent>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
        ></div>
      </CardContent>
    </Card>
  );
}
