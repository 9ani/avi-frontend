"use client";

interface DocumentProps {
  fileName: string;
  fileType: string;
  fileSize: string;
  downloadIcon?: React.ReactNode;
  Logo?: React.ReactNode;
  onClick?: () => void;
}

export function Document({
  Logo,
  fileName,
  fileType,
  fileSize,
  downloadIcon,
  onClick,
}: DocumentProps) {
  return (
    <div
      className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-2 py-3 w-fit gap-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col gap-8 text-sm  font-medium  text-(--color-text)">
        <span className="">{fileName}</span>
        <div className="flex items-center gap-4">
          {Logo && <div className="shrink-0">{Logo}</div>}
          <span className="">
            {fileType} . {fileSize}
          </span>
          {downloadIcon && (
            <div className="shrink-0 cursor-pointer">{downloadIcon}</div>
          )}
        </div>
      </div>
    </div>
  );
}
