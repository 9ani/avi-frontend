"use client";

import { PageUplaodCard } from "@/app/components/common/Intro/PageUplaodCard";
import { usePageLogo } from "@/app/hooks/usePageLogo";

export function AgentTranskribatorPage() {
  const PageLogo = usePageLogo();
  return (
    <PageUplaodCard logo={PageLogo}>
      <div>
        Загрузите аудио-файл в формате MP3 для генерации транскрипта и резюме
      </div>
    </PageUplaodCard>
  );
}





