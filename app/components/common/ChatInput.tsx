"use client";
import React, { useState } from "react";
import { Button } from "@/app/components/common/Button";
import { Send } from "@public/icons";

interface ChatInputProps {
  placeholder?: string;
  onSubmit?: (message: string) => void;
  className?: string;
  disabled?: boolean;
}

export function ChatInput({
  placeholder = "Поговорить с ботом",
  onSubmit,
  className,
  disabled = false,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && onSubmit && !disabled) {
      onSubmit(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !disabled) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={[
        "flex items-center rounded-2xl bg-white  shadow-sm overflow-hidden",
        disabled ? "opacity-50 cursor-not-allowed" : "",
        className || "",
      ].join(" ")}
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 px-4 py-5 outline-none text-sm placeholder:text-gray-400 bg-transparent disabled:cursor-not-allowed"
      />
      <Button
        type="submit"
        disabled={!message.trim() || disabled}
        className="mr-4 p-1 cursor-pointer rounded-lg bg-(--color-button) hover:bg-(--color-button-hover-accent) text-white disabled:cursor-not-allowed transition-colors "
      >
        <Send strokeColor="white" width={32} height={32} />
      </Button>
    </form>
  );
}
