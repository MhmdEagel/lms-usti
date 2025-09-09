import { ReactNode } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar/DashboardSidebar";
import { SIDEBAR_DOSEN, SIDEBAR_MAHASISWA } from "./DashboardLayout.constants";
import DashboardHeader from "./DashboardHeader/DashboardHeader";
import { User } from "next-auth";


interface PropTypes {
  user?: User;
  children: ReactNode;
  type: string;
}

export default function DashboardLayout(props: PropTypes) {
  const { children, type = "mahasiswa", user } = props;

  const sidebarItems = type === "mahasiswa" ? SIDEBAR_MAHASISWA : SIDEBAR_DOSEN;

  return (
    <SidebarProvider
      style={
        {
          "--header-height": "calc(var(--spacing) * 16)",
        } as React.CSSProperties
      }
    >
      <DashboardSidebar user={user} sidebarItems={sidebarItems} />
      <SidebarInset>
        <div className="flex h-screen flex-col overflow-hidden">
          <DashboardHeader />
          <main className="flex flex-1 flex-col p-4 overflow-y-auto">
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
