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
        "h-[calc(100vh-110px)] transition-[padding-right] duration-300 ease-out pt-14",
        isOpen ? "pr-[360px]" : "pr-0",
      ].join(" ")}
    >
      {/* refhesh move to right panel line with div */}
      <div className="lg:absolute sm:relative lg:left-4 lg:top-22 left-4 top-0">
        <Refresh />
      </div>

      {children}
    </div>
  );
}
