"use client";
import { useState } from "react";
import { usePageLogo } from "@/app/hooks/usePageLogo";
import { PageIntroCard } from "@/app/components/common/Intro/PageIntroCard";
import { ChatInput } from "@/app/components/common/ChatInput";
import { UserRequest } from "@/app/components/common/UserRequest";
import {
  ProcessingCard,
  WorkflowStepData,
} from "@/app/components/common/ProcessingCard";

interface MessageData {
  text: string;
  processingStatus: "loading" | "failed" | "success";
  steps: WorkflowStepData[];
  content?: string;
}

export function QaAgentPage() {
  const categories = [
    "Я новый сотрудник",
    "Документы и регламенты",
    "Наши IT-системы",
    "Частые задачи",
    "Архивные документы",
    "Вопросы налогообложения",
  ];
  const PageLogo = usePageLogo();
  const [messages, setMessages] = useState<MessageData[]>([]);

  const isProcessing = messages.some(
    (msg) => msg.processingStatus === "loading"
  );

  const handleChatSubmit = (message: string) => {
    const newMessage: MessageData = {
      text: message,
      processingStatus: "loading",
      steps: [],
    };

    setMessages((prev) => [...prev, newMessage]);

    // TODO: Implement actual chat submission logic
    // Simulate processing completion after a delay
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1
            ? {
                ...msg,
                processingStatus: "success",
                steps: [
                  {
                    name: "process_user_query",
                    duration: "1245.67 ms",
                  },
                  {
                    name: "generate_response",
                    duration: "523.12 ms",
                  },
                ],
              }
            : msg
        )
      );
    }, 2000);
  };

  const getCategoryContent = (category: string): string => {
    // Content to show when "Я новый сотрудник" category is clicked
    if (category === "Частые задачи") {
      return `✦ Как оформить отпуск?
✦ Как забронировать переговорную комнату?
✦ Заказ визиток.
✦ Как получить оборудование для работы?
✦ Как руководителю подать заявку на поиск нового сотрудника?
✦ Куда обращаться, если не работает компьютер?
✦ Как создать заявку в Pyrus?
✦ Как подать заявку на организацию видеоконференции?
✦ Куда обращаться, если не работает интернет?
✦ Как создать задачу в группу сопровождения Pyrus?
✦ Как подать заявку на доступ к новой системе?`;
    }
    return "";
  };

  const handleCategoryClick = (category: string) => {
    const content = getCategoryContent(category);
    const newMessage: MessageData = {
      text: category,
      processingStatus: "loading",
      steps: [],
      content: content,
    };

    setMessages((prev) => [...prev, newMessage]);

    // TODO: Implement actual chat submission logic
    // Simulate processing completion after a delay
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1
            ? {
                ...msg,
                processingStatus: "success",
                steps: [
                  {
                    name: "process_user_query",
                    duration: "1245.67 ms",
                  },
                  {
                    name: "generate_response",
                    duration: "523.12 ms",
                  },
                ],
              }
            : msg
        )
      );
    }, 2000);
  };

  const handleStopProcessing = (messageIndex: number) => {
    setMessages((prev) =>
      prev.map((msg, index) =>
        index === messageIndex ? { ...msg, processingStatus: "failed" } : msg
      )
    );
  };

  return (
    <div className="flex flex-col h-full w-full">
      {messages.length === 0 ? (
        <PageIntroCard logo={PageLogo}>
          <div className="flex flex-col gap-2">
            <div className="">Здравствуйте! Чем могу помочь?</div>
            <p>Выберите ваш тип запроса или задайте вопрос вручную</p>
            <div className="mt-2 flex flex-wrap gap-3">
              {categories.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleCategoryClick(label)}
                  className="rounded-lg border border-(--color-border-muted) text-(--color-accent) font-medium px-4 py-2 text-sm transition-colors hover:bg-amber-50 cursor-pointer"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </PageIntroCard>
      ) : (
        <div className="flex-1 overflow-y-auto pt-6 pb-4">
          <div className="flex flex-col gap-4">
            {messages.map((message, index) => (
              <div key={index} className="flex flex-col gap-4">
                <UserRequest text={message.text} />
                <ProcessingCard
                  logo={PageLogo}
                  status={message.processingStatus}
                  steps={message.steps}
                  onStop={() => handleStopProcessing(index)}
                  showStopButton={false}
                  documentContentSection={
                    message.content ? (
                      <div className="px-4 py-3 text-sm text-(--color-text) whitespace-pre-line">
                        {message.content}
                      </div>
                    ) : undefined
                  }
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="px-24 pb-6 w-full">
        <ChatInput onSubmit={handleChatSubmit} disabled={isProcessing} />
      </div>
    </div>
  );
}
