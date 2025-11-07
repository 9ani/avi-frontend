"use client";
import React from "react";
import { Pin, Rename, Trash } from "@public/icons";

interface RequestActionsMenuProps {
  onPin: () => void;
  onRename: () => void;
  onDelete: () => void;
  onClose: () => void;
}

const RequestActionsMenu: React.FC<RequestActionsMenuProps> = ({
  onPin,
  onRename,
  onDelete,
  onClose,
}) => {
  return (
    <div
      role="menu"
      aria-label="Действия с запросом"
      className="absolute right-0 top-9 z-50 w-60 rounded-2xl bg-white p-3 shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
    >
      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-(--color-text) hover:bg-(--color-accent)/10"
        onClick={() => {
          onPin();
          onClose();
        }}
      >
        <Pin />
        <span>Закрепить</span>
      </button>
      <button
        type="button"
        className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-(--color-text) hover:bg-(--color-accent)/10"
        onClick={() => {
          onRename();
          onClose();
        }}
      >
        <Rename />
        <span>Переименовать</span>
      </button>
      <button
        type="button"
        className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-(--color-text) hover:bg-(--color-accent)/10"
        onClick={() => {
          onDelete();
          onClose();
        }}
      >
        <Trash />
        <span>Удалить</span>
      </button>
    </div>
  );
};

export default RequestActionsMenu;
