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
      <HeaderNav />
      <Sidebar />
      <main
        className={[
          "fixed top-0 right-0 h-screen flex flex-col",
          // Desktop: always offset by sidebar width
          "lg:left-[240px]",
          // Mobile/Tablet: full width
          "left-0",
        ].join(" ")}
      >
        <div className="flex-1 overflow-y-auto mt-18">{children}</div>
      </main>
      <RightPanel />
    </>
  );
}
