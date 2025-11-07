"use client";
import { Button } from "@components/common/Button";
import { PageIntroCard } from "@/app/components/common/Intro/PageIntroCard";
import { usePageLogo } from "@/app/hooks/usePageLogo";
import { UserRequest } from "@/app/components/common/UserRequest";
import {
  ProcessingCard,
  WorkflowStepData,
  DocumentData,
} from "@/app/components/common/ProcessingCard";
import { useState } from "react";
import ActionIconGroups from "@/app/components/common/ActionIconGroups";
import { Home, Download } from "@public/icons";

export function CbondsMonitorPage() {
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
  return (
    <div className="flex flex-col gap-8 h-full">
      <PageIntroCard logo={PageLogo} center={!showRequest}>
        <div className="mb-2">Привет!</div>
        <p>
          Я — бот для формирования полного еженедельного отчёта по рынку
          облигаций.Всего один запрос — и ты получишь готовый отчёт — для
          инвестиционных обзоров, клиентских рассылок.
        </p>
        <div className="mt-4 ">
          <Button
            onClick={() => {
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
                    name: "get_floating_bonds_api_floating_bonds_get",
                    duration: "347.43 ms",
                  },
                  {
                    name: "get_floating_bonds_api_floating_bonds_get",
                    duration: "347.43 ms",
                  },
                ]);
                setProcessingDocuments([
                  {
                    fileName: "report.docx",
                    fileType: "DOCX",
                    fileSize: "365.78KB",
                    downloadIcon: <Download />,
                  },
                ]);
              }, 2000);
            }}
            className="inline-flex p-3 rounded-xl self-start items-center gap-2 bg-(--color-accent) text-(--color-accent-contrast) hover:bg-(--color-accent-hover) cursor-pointer"
          >
            Отчёт за текущую неделю
          </Button>
        </div>
      </PageIntroCard>
      {showRequest && <UserRequest text="Отчёт за текущую неделю" />}
      {isProcessing && (
        <>
          <ProcessingCard
            logo={PageLogo}
            onStop={() => setIsProcessing(false)}
            status={processingStatus}
            steps={processingSteps}
            documents={processingDocuments}
            documentContentSection={
              <div className="flex flex-col gap-2">
                <span>
                  Еженедельный отчёт по рынку облигаций успешно сформирован.
                </span>
                <span>📄 DOCX-файл:</span>
                <span>📊 Excel: </span>
              </div>
            }
          />
          <ActionIconGroups className="mt-2" />
        </>
      )}
    </div>
  );
}
