"use client";
import React, { useState } from "react";
import { Profile } from "@public/icons";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 bg-(--color-panel) border-b border-(--color-border)">
      <div
        className={[
          "h-18 px-6 flex items-center justify-end transition-[padding-right] duration-300 ease-out",
        ].join(" ")}
      >
        {/* <div className="flex items-center gap-3">
          <Logo strokeColor="#B58150" />
        </div> */}
        <div className="relative">
          <button
            className="flex items-center gap-3 rounded-md px-3 py-1 hover:bg-(--color-bg) transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={open}
          >
            <div className="flex items-center gap-2">
              <Profile strokeColor="#495464" />
              <span className="text-sm text-(--color-text)">Profile</span>
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
