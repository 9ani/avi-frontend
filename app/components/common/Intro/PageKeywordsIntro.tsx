"use client";
import React, { useState } from "react";
import { Button } from "@/app/components/common/Button";
import { Send } from "@public/icons";

interface PageKeywordsIntroProps {
  logo?: React.ReactNode;
  title: React.ReactNode;
  helperText?: string;
  placeholder?: string;
  defaultValue?: string;
  buttonLabel?: string;
  onSubmit?: () => void;
  className?: string;
  ActionIcon?: React.ReactNode;
  center?: boolean;
}

export function PageKeywordsIntro({
  logo,
  title,
  helperText,
  placeholder,
  defaultValue,
  buttonLabel = "Выполнить",
  onSubmit,
  className,
  ActionIcon = <Send />,
  center = true,
}: PageKeywordsIntroProps) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div
      className={[
        "px-24 flex w-full",
        center ? "items-center h-full" : "items-start mt-10",
        className || "",
      ].join(" ")}
    >
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-start gap-4">
          {logo}
          <div className="rounded-md text-base">{title}</div>
        </div>
        <div>
          {helperText && (
            <div className="text-sm text-(--color-text-gray) italic">
              {helperText}
            </div>
          )}
          <div className="rounded-lg bg-white border border-[#bfbfbf] p-4 shadow-sm w-full hover:bg-[#f4f4f4]">
            <textarea
              className={[
                "w-full h-40 resize-vertical outline-none text-lg leading-6 cursor-pointer",
                isEditing ? "text-(--color-text)" : "text-[#939393]",
              ].join(" ")}
              placeholder={placeholder}
              defaultValue={defaultValue}
              readOnly={!isEditing}
              onFocus={() => setIsEditing(true)}
              aria-readonly={!isEditing}
            />
          </div>
        </div>
        <Button
          onClick={onSubmit}
          className="inline-flex p-3 rounded-xl self-start items-center gap-2 bg-(--color-accent) text-(--color-accent-contrast) hover:bg-(--color-button-hover-accent) cursor-pointer"
        >
          {ActionIcon} {buttonLabel}
        </Button>
      </div>
    </div>
  );
}
