"use client";
import { useState } from "react";
import { ChevronRight, Spinner, Success, Fail } from "@public/icons";
import { WorkflowStep } from "./WorkflowStep";
import { Document } from "./Document";

interface WorkflowStepData {
  name: string;
  duration: string;
  icon?: React.ReactNode;
}

interface DocumentData {
  fileName: string;
  fileType: string;
  fileSize: string;
  downloadIcon?: React.ReactNode;
  logo?: React.ReactNode;
  showDownloadOnHover?: boolean;
}

interface ProcessingBarProps {
  status?: "loading" | "failed" | "success";
  steps?: WorkflowStepData[];
  documents?: DocumentData[];
  documentVariant?: "detailed" | "simple";
  documentContentSection?: React.ReactNode;
  onDocumentClick?: (doc: DocumentData, index: number) => void;
}

export function ProcessingBar({
  status = "loading",
  steps = [],
  documents = [],
  documentVariant = "detailed",
  documentContentSection,
  onDocumentClick,
}: ProcessingBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const renderHeader = (icon: React.ReactNode) => (
    <div
      className="flex items-center rounded-lg px-4 py-3 text-sm text-(--color-text) gap-2 cursor-pointer"
      onClick={toggleExpand}
    >
      {icon}
      <span>Обработка рабочего процесса</span>
      <div
        className={` transition-transform duration-200 ${
          isExpanded ? "rotate-90" : ""
        }`}
      >
        <ChevronRight />
      </div>
    </div>
  );

  const renderExpandedContent = () => {
    if (!isExpanded || steps.length === 0) return null;
    return (
      <div className="px-4 pb-4 pt-2 space-y-2">
        {steps.map((step, index) => (
          <WorkflowStep
            key={index}
            name={step.name}
            duration={step.duration}
            icon={step.icon}
          />
        ))}
      </div>
    );
  };

  const renderDocuments = () => {
    // Show content section even if no documents, if provided
    if (documents.length === 0 && !documentContentSection) return null;

    if (documentVariant === "simple") {
      return (
        <div className="w-fit pt-2 space-y-3">
          {documents.map((doc, index) => (
            <Document
              key={index}
              fileName={doc.fileName}
              fileType={doc.fileType}
              fileSize={doc.fileSize}
              downloadIcon={doc.downloadIcon}
              Logo={doc.logo}
              onClick={() => onDocumentClick && onDocumentClick(doc, index)}
              showDownloadOnHover={doc.showDownloadOnHover}
            />
          ))}
          {documents.length > 0 && (
            <p className="text-sm text-(--color-text-muted)">
              Файл доступен для скачивания в течение 24 часов после создания.
            </p>
          )}
        </div>
      );
    }

    // Detailed variant (default)
    return (
      <div className="w-fit pt-2 space-y-3">
        {documentContentSection}
        {documents.map((doc, index) => (
          <Document
            key={index}
            fileName={doc.fileName}
            fileType={doc.fileType}
            fileSize={doc.fileSize}
            downloadIcon={doc.downloadIcon}
            Logo={doc.logo}
            onClick={() => onDocumentClick && onDocumentClick(doc, index)}
          />
        ))}
        {documents.length > 0 && (
          <p className="text-sm text-(--color-text-muted)">
            Файл доступен для скачивания в течение 24 часов после создания.
          </p>
        )}
      </div>
    );
  };

  switch (status) {
    case "loading":
    default:
      return (
        <div className="rounded-lg bg-[#f6f1ec] overflow-hidden">
          {renderHeader(<Spinner />)}
          {renderExpandedContent()}
        </div>
      );
    case "failed":
      return (
        <div className="rounded-lg bg-[#fceeed] overflow-hidden">
          {renderHeader(
            <div className="">
              <Fail />
            </div>
          )}
          {renderExpandedContent()}
        </div>
      );
    case "success":
      return (
        <div className="overflow-hidden">
          <div className="bg-[#edf8ee] rounded-lg">
            {renderHeader(
              <div className="">
                <Success />
              </div>
            )}
            {renderExpandedContent()}
          </div>
          {renderDocuments()}
        </div>
      );
  }
}
