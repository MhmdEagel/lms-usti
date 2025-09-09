import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

export default function ClassroomMemberItem({fullname}: {fullname: string | null}) {
  return (
    <div className="flex gap-2 items-center">
      <Avatar className="size-11">
        <AvatarFallback>
          <User />
        </AvatarFallback>
      </Avatar>
      <div>{fullname}</div>
    </div>
  );
}
