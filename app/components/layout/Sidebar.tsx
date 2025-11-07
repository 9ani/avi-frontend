"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "../../constants/navigation";
import { Logo } from "@public/icons";
import { SearchInput } from "@components/common/SearchInput";
import React, { useMemo, useState } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  const filteredNavigation = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return navigation;
    return navigation.filter((item) =>
      item.title.toLowerCase().includes(normalizedQuery)
    );
  }, [query]);
  return (
    <nav className="h-full bg-(--color-sidebar) w-[240px] text-sm">
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
  );
}
