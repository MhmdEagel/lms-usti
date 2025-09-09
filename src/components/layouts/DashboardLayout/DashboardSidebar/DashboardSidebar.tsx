"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { SidebarItem } from "@/types/Dashboard";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { DashboardUserNav } from "./DashboardUserNav/DashboardUserNav";
import { User } from "next-auth";




interface PropTypes {
  user?: User;
  sidebarItems?: SidebarItem[];
}

export default function DashboardSidebar(props: PropTypes) {
  const { sidebarItems, user } = props;
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="mb-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div>
                <Image
                  width={30}
                  height={30}
                  alt="Logo USTI"
                  src={"/images/general/logo_usti.svg"}
                />
                <span className="text-lg font-semibold text-primary">
                  LMS USTI
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarMenu>
          {sidebarItems?.map((item) => (
            <SidebarMenuItem key={item.key}>
              <SidebarMenuButton
                className={cn({
                  "bg-blue-900 hover:bg-blue-900/95 text-white hover:text-white":
                    pathname === item.href,
                })}
                asChild
              >
                <a href={item.href}>
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <DashboardUserNav user={{ avatar:"", name: user?.fullname, email: user?.email }} />
      </SidebarFooter>
    </Sidebar>
  );
}
