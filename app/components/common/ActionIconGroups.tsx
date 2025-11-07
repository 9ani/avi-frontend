import React from "react";
import { Refresh, Copy, Like, Dislike } from "@public/icons";

interface ActionIconGroupsProps {
  className?: string;
}

export function ActionIconGroups({ className = "" }: ActionIconGroupsProps) {
  const groupClass =
    "flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-2 py-1 shadow-sm";
  const itemClass = "p-1 rounded-md hover:bg-neutral-50 cursor-pointer";

  return (
    <div
      className={["flex w-full px-24 justify-end gap-3", className].join(" ")}
    >
      <div className={groupClass}>
        <button type="button" className={itemClass} aria-label="Refresh">
          <Refresh w={20} h={20} strokeColor="#d9bfa7" />
        </button>
        <button type="button" className={itemClass} aria-label="Copy">
          <Copy />
        </button>
      </div>
      <div className={groupClass}>
        <button type="button" className={itemClass} aria-label="Like">
          <Like />
        </button>
        <button type="button" className={itemClass} aria-label="Dislike">
          <Dislike />
        </button>
      </div>
    </div>
  );
}

export default ActionIconGroups;
