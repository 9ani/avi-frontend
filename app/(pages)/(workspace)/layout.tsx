"use client";
import { Refresh } from "@public/icons";
import { useRightPanelStore } from "@/app/store/rightPanel";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isOpen = useRightPanelStore((s: { isOpen: boolean }) => s.isOpen);
  return (
    <div
      className={[
        "h-[calc(100vh-80px)] p-8 transition-[padding-right] duration-300 ease-out",
        isOpen ? "pr-[360px]" : "pr-0",
      ].join(" ")}
    >
      <Refresh />
      {children}
    </div>
  );
}
