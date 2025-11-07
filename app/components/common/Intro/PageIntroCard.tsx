import React, { type ElementType } from "react";
interface PageIntroCardProps {
  logo?: ElementType;
  children: React.ReactNode;
  className?: string;
  center?: boolean;
}

export function PageIntroCard({
  logo: Logo,
  children,
  className,
  center = true,
}: PageIntroCardProps) {
  return (
    <div
      className={[
        "flex w-full px-24",
        center ? "items-center h-full" : "items-start mt-10",
        className || "",
      ].join(" ")}
    >
      <div className="flex items-start justify-center gap-4">
        {Logo && <Logo w={40} h={40} />}
        <div className="flex-1 rounded-md bg-white p-4 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
