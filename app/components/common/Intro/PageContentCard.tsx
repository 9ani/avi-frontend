import React, { type ElementType } from "react";

interface PageContentCardProps {
  logo?: ElementType;
  children: React.ReactNode;
  className?: string;
}

export function PageContentCard({
  logo: Logo,
  children,
  className,
}: PageContentCardProps) {
  return (
    <div className={["flex w-full lg:px-24 sm:px-8 px-4", className || ""].join(" ")}>
      <div className="flex items-start justify-center gap-4 w-full">
        {Logo && <Logo w={40} h={40} />}
        <div className="flex-1 rounded-md bg-white p-4 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
