"use client";

import { useState } from "react";
import { DesktopSideNav } from "@/app/components/DesktopSideNav";
import { BottomNavigationBar } from "@/app/components/BottomNavigationBar";

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSideNavCollapsed, setIsSideNavCollapsed] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavCollapsed(!isSideNavCollapsed);
  };

  return (
    <div className="flex h-screen">
      <DesktopSideNav isCollapsed={isSideNavCollapsed} toggleCollapse={toggleSideNav} />
      <main
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isSideNavCollapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        {children}
      </main>
      <div className="md:hidden">
        <BottomNavigationBar />
      </div>
    </div>
  );
}
