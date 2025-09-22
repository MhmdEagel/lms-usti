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
      className={cn(
        "p-3 flex-1 gap-1.5 inline-flex items-center justify-center relative h-full whitespace-nowrap",
        {
          "bg-accent text-primary after:absolute after:bottom-0 after:left-1/4 after:w-1/2 after:h-[2px] after:block after:bg-primary after:content-[''] cursor-pointer":
            isActive,
        }
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
