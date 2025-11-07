"use client";
import React, { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { navigation } from "@/app/constants/navigation";
import { Panel, Edit, Info, ShaiLogo, ThreeDots } from "@public/icons";
import { useRightPanelStore } from "@/app/store/rightPanel";
import NewRequestButton from "@/app/components/right-panel/NewRequestButton";
import RequestActionsMenu from "@/app/components/right-panel/RequestActionsMenu";

export function RightPanel() {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const isOpen = useRightPanelStore((s: { isOpen: boolean }) => s.isOpen);
  const open = useRightPanelStore((s: { open: () => void }) => s.open);
  const close = useRightPanelStore((s: { close: () => void }) => s.close);
  const pathname = usePathname();

  const pageTitle = useMemo(() => {
    const match = navigation.find((n) => n.href === pathname);
    if (match?.title) return match.title;
    if (!pathname) return "";
    const last = pathname.split("/").filter(Boolean).pop() || "";
    const normalized = last.replace(/-/g, " ");
    return normalized
      ? normalized.charAt(0).toUpperCase() + normalized.slice(1)
      : "";
  }, [pathname]);

  const PageLogo = useMemo(() => {
    const match = navigation.find((n) => n.href === pathname);
    return match?.logo;
  }, [pathname]);

  return (
    <>
      {/* Hidden panel */}
      {!isOpen && (
        <div className=" fixed right-0 top-18 h-18 w-[360px] flex items-center justify-around gap-3 rounded-md ">
          <Edit />
          <div className="w-0.5 h-6 bg-[#bcbab2]" />
          <div className="text-xl font-semibold">{pageTitle}</div>
          <button
            type="button"
            aria-expanded={isOpen}
            aria-label="Open right panel"
            onClick={open}
            className="rounded p-1 hover:bg-(--color-button-hover) transition-colors duration-500 cursor-pointer"
          >
            <Panel />
          </button>
        </div>
      )}

      {/* Sliding Right Panel */}
      <aside
        aria-hidden={!isOpen}
        className={[
          "fixed right-0 top-18 z-40 h-[calc(100vh-72px)]  w-[360px] max-w-[80vw] border-l border-neutral-200 bg-white",
          "shadow-[inset_1px_0_0_rgba(0,0,0,0.04)]",
          "transform transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="flex h-full flex-col p-4">
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-label="Close right panel"
              onClick={close}
              className="rounded p-1 hover:bg-white transition-colors duration-500 cursor-pointer"
            >
              <Panel />
            </button>
            <div className="text-xl font-semibold">{pageTitle}</div>
            {PageLogo ? <PageLogo w={32} h={32} /> : <Edit />}
          </div>
          <div className="mb-4">
            <NewRequestButton onClick={() => {}} />
          </div>
          <div className="flex-1 overflow-y-auto">
            <ul className="space-y-6 text-sm text-(--color-text-gray)">
              <li>
                <div className="mb-2  text-center text-sm font-medium ">
                  Сегодня, 25.10.2025
                </div>
                <div className="space-y-2">
                  {[0, 1].map((idx) => (
                    <div key={idx} className="relative">
                      <div className="rounded-xl bg-white p-3 shadow-sm hover:bg-[#f4e9d8] transition-colors flex items-center justify-between">
                        <span>Название запроса</span>
                        <button
                          type="button"
                          aria-haspopup="menu"
                          aria-expanded={openMenuIndex === idx}
                          onClick={() =>
                            setOpenMenuIndex(openMenuIndex === idx ? null : idx)
                          }
                          className="rounded p-1 hover:bg-(--color-accent)/10"
                        >
                          <ThreeDots />
                        </button>
                      </div>
                      {openMenuIndex === idx && (
                        <RequestActionsMenu
                          onPin={() => {}}
                          onRename={() => {}}
                          onDelete={() => {}}
                          onClose={() => setOpenMenuIndex(null)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </li>
              <li>
                <div className="mb-2  text-center  text-sm font-medium text-neutral-500">
                  23.10.2025
                </div>
                <div className="space-y-2">
                  {[2].map((idx) => (
                    <div key={idx} className="relative">
                      <div className="rounded-xl bg-white p-3 shadow-sm hover:bg-[#f4e9d8] transition-colors flex items-center justify-between">
                        <span>Название запроса</span>
                        <button
                          type="button"
                          aria-haspopup="menu"
                          aria-expanded={openMenuIndex === idx}
                          onClick={() =>
                            setOpenMenuIndex(openMenuIndex === idx ? null : idx)
                          }
                          className="rounded p-1 hover:bg-(--color-accent)/10"
                        >
                          <ThreeDots />
                        </button>
                      </div>
                      {openMenuIndex === idx && (
                        <RequestActionsMenu
                          onPin={() => {}}
                          onRename={() => {}}
                          onDelete={() => {}}
                          onClose={() => setOpenMenuIndex(null)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </li>
              <li>
                <div className="mb-2 text-sm font-medium text-neutral-500 text-center ">
                  20.10.2025
                </div>
                <div className="space-y-2">
                  {[3].map((idx) => (
                    <div key={idx} className="relative">
                      <div className="rounded-xl bg-white p-3 shadow-sm hover:bg-[#f4e9d8] transition-colors flex items-center justify-between">
                        <span>Название запроса</span>
                        <button
                          type="button"
                          aria-haspopup="menu"
                          aria-expanded={openMenuIndex === idx}
                          onClick={() =>
                            setOpenMenuIndex(openMenuIndex === idx ? null : idx)
                          }
                          className="rounded p-1 hover:bg-(--color-accent)/10"
                        >
                          <ThreeDots />
                        </button>
                      </div>
                      {openMenuIndex === idx && (
                        <RequestActionsMenu
                          onPin={() => {}}
                          onRename={() => {}}
                          onDelete={() => {}}
                          onClose={() => setOpenMenuIndex(null)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-4 flex items-center justify-between text-base font-semibold">
            <Info />
            <div className="flex items-center gap-2">
              РАБОТАЕТ НА <ShaiLogo />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
