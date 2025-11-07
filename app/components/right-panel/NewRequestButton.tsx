"use client";
import React from "react";
import { Edit } from "@public/icons";

interface NewRequestButtonProps {
  onClick: () => void;
}

const NewRequestButton: React.FC<NewRequestButtonProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1 justify-center w-full border border-(--color-accent) bg-white p-2 text-base font-medium rounded-xl text-(--color-accent) transition-colors duration-200 hover:bg-(--color-accent)/10 active:bg-neutral-100 active:text-(--color-text-gray) active:border-neutral-300"
      aria-label="Создать новый запрос"
    >
      <Edit strokeColor="var(--color-accent)" />
      <span>Новый запрос</span>
    </button>
  );
};

export default NewRequestButton;
