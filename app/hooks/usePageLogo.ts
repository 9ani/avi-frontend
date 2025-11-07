"use client";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { navigation } from "@/app/constants/navigation";
import type { ElementType } from "react";

export function usePageLogo(): ElementType | undefined {
  const pathname = usePathname();

  const PageLogo = useMemo(() => {
    const match = navigation.find((n) => n.href === pathname);
    return match?.logo;
  }, [pathname]);

  return PageLogo;
}


