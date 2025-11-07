"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "../../constants/navigation";
import { Logo } from "@public/icons";
import { SearchInput } from "@components/common/SearchInput";
import React, { useMemo, useState, useEffect } from "react";
import { useSidebarStore } from "@/app/store/sidebar";

export function Sidebar() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const isOpen = useSidebarStore((s: { isOpen: boolean }) => s.isOpen);
  const close = useSidebarStore((s: { close: () => void }) => s.close);

  const filteredNavigation = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return navigation;
    return navigation.filter((item) =>
      item.title.toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  // Close sidebar when window resizes to desktop size
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        close();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, close]);

  // Close sidebar on route change for mobile/tablet only
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.innerWidth < 1024;
    if (isMobile && isOpen) {
      close();
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* Overlay for mobile/tablet */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <nav
        aria-hidden={!isOpen}
        className={[
          "h-screen bg-(--color-sidebar) w-[240px] text-sm overflow-y-auto",
          "fixed left-0 top-0 z-50",
          "transform transition-transform duration-300 ease-out",
          // Desktop: always visible, static positioning
          "lg:translate-x-0 lg:static lg:z-auto",
          // Mobile/Tablet: slide in/out based on isOpen state
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        <div className="p-4 h-18 ">
          <Logo strokeColor="#B58150" />
        </div>
        <SearchInput value={query} onChange={(e) => setQuery(e.target.value)} />
        <ul className="mt-2">
          {query.trim() && filteredNavigation.length === 0 ? (
            <li className="px-4 py-3 text-(--color-accent-contrast)/60">
              Ничего не найдено
            </li>
          ) : (
            filteredNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 pr-6 transition-colors ${
                      isActive
                        ? "bg-(--color-sidebar-accent) text-(--color-accent-contrast)"
                        : "text-(--color-accent-contrast)/80 hover:bg-(--color-sidebar-accent)/60 hover:text-(--color-accent-contrast)"
                    }`}
                  >
                    {item.logo ? <item.logo /> : null}
                    <span className={isActive ? "font-bold" : ""}>
                      {item.title}
                    </span>
                    {isActive ? (
                      <span
                        className="absolute right-0 top-0 bottom-0 w-1"
                        style={{ backgroundColor: "#B58150" }}
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })
          )}
        </ul>
      </nav>
    </>
  );
}
