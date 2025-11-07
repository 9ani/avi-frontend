"use client";
import React, { type ElementType, useState, useEffect } from "react";
import Upload from "@public/icons/Upload";
import { Button } from "../Button";
import { Send, Spinner, PDF, Trash } from "@public/icons";

interface PageUplaodCardProps {
  logo?: ElementType;
  children: React.ReactNode;
  className?: string;
  onProcessStart?: () => void;
  center?: boolean;
}

export function PageUplaodCard({
  logo: Logo,
  children,
  className,
  onProcessStart,
  center = true,
}: PageUplaodCardProps) {
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "uploaded"
  >("idle");
  const [fileName] = useState("TS_Yandex_001P-01.pdf");
  const [fileSize] = useState("359.88 KB");

  const handleUploadClick = () => {
    if (uploadStatus === "idle") {
      setUploadStatus("uploading");
    }
  };

  const handleRemoveFile = () => {
    setUploadStatus("idle");
  };

  const handleSendClick = () => {
    if (uploadStatus === "uploaded") {
      onProcessStart?.();
    }
  };

  useEffect(() => {
    if (uploadStatus === "uploading") {
      const timer = setTimeout(() => {
        setUploadStatus("uploaded");
      }, 2000); // Show spinner for 2 seconds

      return () => clearTimeout(timer);
    }
  }, [uploadStatus]);

  const isSendButtonDisabled = uploadStatus !== "uploaded";

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
          {Logo && <Logo w={40} h={40} />}

          <div className="rounded-md text-base ">{children}</div>
        </div>

        <div
          onClick={uploadStatus === "uploaded" ? undefined : handleUploadClick}
          className={`flex items-center gap-2 justify-center rounded-lg bg-white p-4 shadow-sm w-full transition-colors ${
            uploadStatus === "uploaded"
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:bg-gray-100"
          }`}
        >
          {uploadStatus === "uploading" ? (
            <>
              <Spinner width={20} height={20} />
              <span>Загрузка...</span>
            </>
          ) : (
            <>
              <Upload /> <span>Локальная загрузка</span>
            </>
          )}
        </div>

        {uploadStatus === "uploaded" && (
          <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm w-full">
            <div className="flex items-center gap-4 flex-1">
              <PDF />
              <div className="flex flex-col">
                <span className="text-base font-medium text-(--color-text)">
                  {fileName}
                </span>
                <span className="text-sm text-gray-500">PDF – {fileSize}</span>
              </div>
            </div>
            <button
              onClick={handleRemoveFile}
              className="cursor-pointer hover:opacity-70 transition-opacity"
              aria-label="Удалить файл"
            >
              <Trash w={32} h={32} />
            </button>
          </div>
        )}

        <Button
          disabled={isSendButtonDisabled}
          onClick={handleSendClick}
          className={`inline-flex p-3 rounded-xl self-start items-center gap-2 bg-(--color-accent) text-(--color-accent-contrast) hover:bg-(--color-accent-hover) cursor-pointer ${
            isSendButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <Send /> Преобразовать
        </Button>
      </div>
    </div>
  );
}
