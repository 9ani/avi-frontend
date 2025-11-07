import { Stop } from "@public/icons";
import { ElementType } from "react";
import { PageContentCard } from "@/app/components/common/Intro/PageContentCard";
import { ProcessingBar } from "@/app/components/common/ProcessingBar";

export interface WorkflowStepData {
  name: string;
  duration: string;
  icon?: React.ReactNode;
}

export interface DocumentData {
  fileName: string;
  fileType: string;
  fileSize: string;
  downloadIcon?: React.ReactNode;
  logo?: React.ReactNode;
}

interface ProcessingCardProps {
  onStop: () => void;
  logo?: ElementType;
  status?: "loading" | "failed" | "success";
  steps?: WorkflowStepData[];
  documents?: DocumentData[];
  documentVariant?: "detailed" | "simple";
  documentContentSection?: React.ReactNode;
  onDocumentClick?: (doc: DocumentData, index: number) => void;
  showStopButton?: boolean;
}

export function ProcessingCard({
  onStop,
  logo: Logo,
  status = "loading",
  steps = [],
  documents = [],
  documentVariant = "detailed",
  documentContentSection,
  onDocumentClick,
  showStopButton = true,
}: ProcessingCardProps) {
  return (
    <div className="w-full">
      <PageContentCard logo={Logo}>
        <div className="flex-1">
          <ProcessingBar
            status={status}
            steps={steps}
            documents={documents}
            documentVariant={documentVariant}
            documentContentSection={documentContentSection}
            onDocumentClick={onDocumentClick}
          />

          {status === "loading" && showStopButton && (
            <div className="flex justify-center ">
              <button
                type="button"
                onClick={onStop}
                className="fixed left-1/2 -translate-x-1/2 bottom-6 inline-flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm text-(--color-text) shadow-sm hover:bg-neutral-50"
              >
                <Stop />
                Остановить процесс
              </button>
            </div>
          )}
        </div>
      </PageContentCard>
    </div>
  );
}
