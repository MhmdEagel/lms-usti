import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ClassroomDetailLayoutNavbarItem({
  isActive,
  href,
  children,
}: {
  isActive: boolean;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      className={cn({
        "bg-accent relative text-primary after:absolute after:bottom-0 after:left-1/4 after:w-1/2 after:h-[2px] after:block after:bg-primary after:content-[''] cursor-pointer":
          isActive,
      })}
      href={href}
    >
      {children}
    </Link>
  );
}
