"use client";
import React from "react";
import { usePathname } from "next/navigation";
import HeaderNav from "./HeaderNav";
import { Sidebar } from "./Sidebar";
import { RightPanel } from "../layout/RightPanel";
import { Logo } from "@public/icons";

export default function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = pathname === "/login" || pathname === "/reset-password";

  if (isAuthRoute) {
    return (
      <div className="p-4 h-screen">
        <div className="h-full  flex flex-col rounded-lg bg-white">
          <header className="px-6 py-4">
            <Logo strokeColor="#B58150" />
          </header>
          <main className="h-full flex items-center justify-center px-4">
            {children}
          </main>
        </div>
      </div>
    );
  }

  return (
    <>
      <aside className="fixed left-0 top-0 h-screen z-50">
        <Sidebar />
      </aside>
      <main className="fixed top-0 lg:left-[240px] right-0 h-screen flex flex-col z-0 left-0">
        <HeaderNav />
        <div className="flex-1 overflow-y-auto mt-18">{children}</div>
      </main>
      <RightPanel />
    </>
  );
}
