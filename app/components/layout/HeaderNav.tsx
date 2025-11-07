"use client";
import React, { useState } from "react";
import {
  Profile,
  Hummer,
  Book,
  Robot,
  Globe,
  GlobeActive,
  BookActive,
  RobotActive,
  HummerActive,
} from "@public/icons";
import { Button } from "../common/Button";

export default function HeaderNav() {
  const navs: {
    title: string;
    icon: React.ElementType;
    activeIcon: React.ElementType;
  }[] = [
    { title: "Чаты", icon: Globe, activeIcon: GlobeActive },
    { title: "Студия", icon: Robot, activeIcon: RobotActive },
    { title: "Знания", icon: Book, activeIcon: BookActive },
    { title: "Инструменты", icon: Hummer, activeIcon: HummerActive },
  ];
  const [active, setActive] = useState(navs[0].title);
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 bg-(--color-panel) border-b border-(--color-border)">
      <div className="h-18 px-6 flex items-center justify-between transition-[padding-right] duration-300 ease-out">
        <div></div>
        <div className="flex items-center gap-3">
          {navs.map((nav) => {
            const Icon: React.ElementType = nav.icon;
            const ActiveIcon: React.ElementType = nav.activeIcon;
            const isActive = active === nav.title;
            return (
              <Button
                key={nav.title}
                onClick={() => setActive(nav.title)}
                aria-pressed={isActive}
                className={[
                  "flex items-center gap-2 p-1 rounded-lg cursor-pointer",
                  isActive ? "bg-white" : "hover:bg-[#edeceb]",
                ].join(" ")}
              >
                {isActive ? (
                  <ActiveIcon strokeColor="#0e5f4c" />
                ) : (
                  <Icon strokeColor="#495464" />
                )}{" "}
                {nav.title}
              </Button>
            );
          })}
        </div>
        <div className="relative">
          <button
            className="flex items-center gap-3 rounded-md px-3 py-1 hover:bg-(--color-bg) transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={open}
          >
            <div className="flex items-center gap-2">
              <Profile strokeColor="#b58150" />
              <span className="text-base text-(--color-text)">Profile</span>
            </div>
          </button>
          {open && (
            <div
              className="z-50 absolute right-0 mt-2 w-48 rounded-md bg-white shadow ring-1 ring-black/5 text-sm overflow-hidden"
              role="menu"
            >
              <div className="px-4 py-2 text-(--color-text-gray)">
                Signed in
              </div>
              <button
                className="w-full text-left px-4 py-2 hover:bg-(--color-panel)"
                role="menuitem"
              >
                Account
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-(--color-panel)"
                role="menuitem"
              >
                Settings
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-(--color-panel) text-red-600"
                role="menuitem"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
