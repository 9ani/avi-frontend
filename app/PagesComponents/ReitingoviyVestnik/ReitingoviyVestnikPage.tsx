"use client";
import React, { useState } from "react";
import { ReitingoviyVestnik, Send, Home } from "@public/icons";
import { PageKeywordsIntro } from "@/app/components/common/Intro/PageKeywordsIntro";
import {
  ProcessingCard,
  WorkflowStepData,
  DocumentData,
} from "@/app/components/common/ProcessingCard";
import ActionIconGroups from "@/app/components/common/ActionIconGroups";
import Link from "next/link";

export function ReitingoviyVestnikPage() {
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
      setProcessingDocuments([]);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-8 h-full">
      <PageKeywordsIntro
        logo={<ReitingoviyVestnik w={40} h={40} />}
        ActionIcon={<Send />}
        title={
          <>
            Рейтинговый дайджест AVI Capital: только проверенные новости об
            эмитентах с рейтингом A- и выше. Всё главное — коротко и по делу
          </>
        }
        helperText="Ключевые слова заданы по умолчанию. Вы можете дополнять их своими"
        defaultValue={
          "ОТЧЕТ, отчётность, финансовая отчётность, бухгалтерская отчётность, МСФО, РСБУ, Финансовые результаты, Операционные результаты, Выручка, EBITDA, Чистая прибыль, FCF, свободный денежный поток, стратегия, Кредитный рейтинг, Чистый долг, Чистый долг / EBITDA, Дивиденды, дивидендная доходность"
        }
        buttonLabel="Выполнить"
        onSubmit={handleSubmit}
        center={!isProcessing}
      />
      {isProcessing && (
        <>
          <ProcessingCard
            onStop={() => setIsProcessing(false)}
            status={processingStatus}
            steps={processingSteps}
            documents={processingDocuments}
            documentContentSection={
              <div className="flex flex-col gap-2">
                <div>
                  ВТБ
                  <br />
                  Российские банки в сентябре выдали ₽405 млрд ипотечных
                  кредитов, это на 11% больше г/г.
                  <br />
                  Всего по итогам 9 месяцев выдачи ипотеки составили более ₽2,6
                  трлн — данные ВТБ
                  <br />
                  Источник:
                  <Link
                    className="text-[#b58150] hover:underline"
                    target="_blank"
                    href="https://t.me/newssmartlab/101554"
                  >
                    {" "}
                    https://t.me/newssmartlab/101554
                  </Link>
                </div>
                <div>
                  ФосАгро
                  <br />
                  Размещение облигаций ФосАгро, БО-02-04 ($250 млн)
                  <br />
                  Источник:
                  <Link
                    className="text-[#b58150] hover:underline"
                    target="_blank"
                    href="https://t.me/cbonds/22129"
                  >
                    {" "}
                    https://t.me/cbonds/22129
                  </Link>
                </div>
                <div>
                  Дайджест успешно отправлен в Telegram-канал:
                  <Link
                    className="text-[#b58150] hover:underline"
                    target="_blank"
                    href="https://t.me/test_companies"
                  >
                    {" "}
                    https://t.me/test_companies
                  </Link>
                </div>
              </div>
            }
          />
          <ActionIconGroups className="mt-2" />
        </>
      )}
    </div>
  );
}
