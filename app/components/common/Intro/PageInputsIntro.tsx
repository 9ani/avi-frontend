"use client";
import React from "react";
import { Button } from "@/app/components/common/Button";
import { Send } from "@public/icons";
import { PageContentCard } from "@/app/components/common/Intro/PageContentCard";

interface PageInputsIntroProps {
  logo?: React.ReactNode;
  title: React.ReactNode;
  helperText?: string;
  firstLabel: string;
  secondLabel?: string;
  firstValue?: string;
  secondValue?: string;
  onFirstChange?: (v: string) => void;
  onSecondChange?: (v: string) => void;
  firstPlaceholder?: string;
  secondPlaceholder?: string;
  buttonLabel?: string;
  onSubmit?: () => void;
  className?: string;
  ActionIcon?: React.ReactNode;
  center?: boolean;
}

export function PageInputsIntro({
  logo,
  title,
  helperText,
  firstLabel,
  secondLabel,
  firstValue,
  secondValue,
  onFirstChange,
  onSecondChange,
  firstPlaceholder,
  secondPlaceholder,
  buttonLabel = "Выполнить",
  onSubmit,
  className,
  center = true,

  ActionIcon = <Send />,
}: PageInputsIntroProps) {
  const LogoComponent = logo ? () => <>{logo}</> : undefined;
  return (
    <div
      className={[
        "flex  w-full",
        center ? "items-center h-full" : "items-start mt-10",
        className || "",
      ].join(" ")}
    >
      <PageContentCard logo={LogoComponent} className="w-full">
        <div className="flex-1 flex flex-col gap-4">
          <div className="rounded-md text-base">{title}</div>
          {helperText && (
            <div className="text-sm text-(--color-text-gray) italic">
              {helperText}
            </div>
          )}
          <div className=" text-[14px] text-neutral-700">
            <label className="flex items-center ">
              <span className="block ">{firstLabel}</span>
              <input
                type="text"
                className="w-full rounded border border-transparent px-3 py-2 outline-none focus:border-(--color-accent)"
                value={firstValue}
                onChange={(e) => onFirstChange?.(e.target.value)}
                placeholder={firstPlaceholder || ""}
              />
            </label>
            {secondLabel !== undefined && (
              <label className="flex items-center gap-2">
                <span className="block ">{secondLabel}</span>
                <input
                  type="text"
                  className="w-full rounded border border-transparent px-3 py-2 outline-none focus:border-(--color-accent)"
                  value={secondValue}
                  onChange={(e) => onSecondChange?.(e.target.value)}
                  placeholder={secondPlaceholder || ""}
                />
              </label>
            )}
          </div>
          <Button
            onClick={onSubmit}
            className="inline-flex p-3 rounded-xl self-start items-center gap-2 bg-(--color-accent) text-(--color-accent-contrast) hover:bg-(--color-accent-hover) cursor-pointer"
          >
            {ActionIcon} {buttonLabel}
          </Button>
        </div>
      </PageContentCard>
    </div>
  );
}
