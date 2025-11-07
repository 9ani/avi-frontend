"use client";
import React, { useState } from "react";
import { PageInputsIntro } from "@/app/components/common/Intro/PageInputsIntro";
import { ObzorPoEmittentam, Send, Home, PDF } from "@/public/icons";
import {
  ProcessingCard,
  WorkflowStepData,
  DocumentData,
} from "@/app/components/common/ProcessingCard";
import ActionIconGroups from "@/app/components/common/ActionIconGroups";
import PdfModal from "@/app/components/common/PdfModal";

export function ObzorPoEmittentamPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<
    "loading" | "failed" | "success"
  >("loading");
  const [processingSteps, setProcessingSteps] = useState<WorkflowStepData[]>(
    []
  );
  const [processingDocuments, setProcessingDocuments] = useState<
    DocumentData[]
  >([]);
  const [showPdf, setShowPdf] = useState(false);

  const handleSubmit = () => {
    setIsProcessing(true);
    setProcessingStatus("loading");
    setProcessingSteps([
      {
        name: "START",
        duration: "0 ms",
        icon: <Home />,
      },
    ]);
    setProcessingDocuments([]);
    setTimeout(() => {
      setProcessingStatus("success");
      setProcessingSteps([
        {
          name: "START",
          duration: "347.43 ms",
          icon: <Home />,
        },
      ]);
      setProcessingDocuments([
        {
          fileName: "Преобразованный файл.pdf",
          fileType: "PDF",
          fileSize: "365.78KB",
          logo: <PDF />,
        },
      ]);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-8 h-full">
      <PageInputsIntro
        logo={<ObzorPoEmittentam w={40} h={40} />}
        ActionIcon={<Send />}
        title={<>Обозреватель эмитентов</>}
        helperText="Введите ИНН компании/эмитента и период отчетности"
        firstLabel="ИНН:"
        secondLabel="Период:"
        buttonLabel="Выполнить"
        onSubmit={handleSubmit}
        center={!isProcessing}
      />
      {isProcessing && (
        <div className="flex flex-col gap-2">
          <ProcessingCard
            onStop={() => setIsProcessing(false)}
            status={processingStatus}
            steps={processingSteps}
            documents={processingDocuments}
            documentVariant="simple"
            onDocumentClick={() => setShowPdf(true)}
          />
          <ActionIconGroups
            className=""
            isLoading={processingStatus === "loading"}
          />
          {showPdf && (
            <PdfModal
              url="/examples/emitant.pdf"
              onCancel={() => setShowPdf(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}
