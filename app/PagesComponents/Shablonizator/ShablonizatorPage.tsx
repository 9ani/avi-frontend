"use client";
import { usePageLogo } from "@/app/hooks/usePageLogo";
import { PageUplaodCard } from "@components/common/Intro/PageUplaodCard";
import {
  ProcessingCard,
  WorkflowStepData,
  DocumentData,
} from "@/app/components/common/ProcessingCard";
import { useState } from "react";
import ActionIconGroups from "@/app/components/common/ActionIconGroups";
import { Download, Home, PDF } from "@public/icons";
import PdfModal from "@/app/components/common/PdfModal";

export function ShablonizatorPage() {
  const PageLogo = usePageLogo();
  const [showRequest, setShowRequest] = useState(false);
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

  return (
    <div className="flex flex-col gap-8 h-full">
      <PageUplaodCard
        logo={PageLogo}
        center={!showRequest}
        onProcessStart={() => {
          setShowRequest(true);
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
          // TODO: Implement actual processing logic here
          // Simulate processing completion after a delay
          setTimeout(() => {
            setProcessingStatus("success");
            setProcessingSteps([
              {
                name: "START",
                duration: "347.43 ms",
                icon: <Home />,
              },
              {
                name: "process_pdf_to_avi_template",
                duration: "1245.67 ms",
              },
              {
                name: "generate_output_file",
                duration: "523.12 ms",
              },
            ]);
            setProcessingDocuments([
              {
                fileName: "Преобразованный файл.pdf",
                fileType: "PDF",
                fileSize: "365.78KB",
                logo: <PDF />,
                downloadIcon: <Download />,
                showDownloadOnHover: true,
              },
            ]);
          }, 2000);
        }}
      >
        <div>
          Загрузите PDF — я приведу его к шаблону AVI и подготовлю файл для
          скачивания.
        </div>
      </PageUplaodCard>
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
            className="mt-2"
            isLoading={processingStatus === "loading"}
          />
          {showPdf && (
            <PdfModal
              url="/examples/shablonizator.pdf"
              onCancel={() => setShowPdf(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}
