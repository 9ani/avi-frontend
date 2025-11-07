"use client";
import { Magnifier } from "@/public/icons";
import React, { useRef, useState } from "react";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

export function SearchInput({
  placeholder = "Поиск агента...",
  ...props
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div
      className="flex items-center gap-2 py-4 px-3 border-b border-t text-(--color-text-muted) border-(--color-border-muted) hover:text-white hover:border-(--color-border) focus-within:text-white focus-within:border-white active:text-white active:border-white cursor-text transition-colors"
      onClick={() => inputRef.current?.focus()}
    >
      <Magnifier strokeColor="currentColor" opacity={isFocused ? 1 : 0.5} />

      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        className="bg-transparent outline-none w-full"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </div>
  );
}
