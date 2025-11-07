import { PageKeywordsIntro } from "@/app/components/common/Intro/PageKeywordsIntro";
import { Makrovestnik, Send } from "@/public/icons";

export function MakrovestnikPage() {
  return (
    <PageKeywordsIntro
      logo={<Makrovestnik w={40} h={40} />}
      ActionIcon={<Send />}
      title={<>Макровестник</>}
      helperText="Ключевые слова заданы по умолчанию. Вы можете дополнять их своими"
      defaultValue={
        "ОТЧЕТ, отчётность, финансовая отчётность, бухгалтерская отчётность, МСФО, РСБУ, Финансовые результаты, Операционные результаты, Выручка, EBITDA, Чистая прибыль, FCF, свободный денежный поток, стратегия, Кредитный рейтинг, Чистый долг, Чистый долг / EBITDA, Дивиденд, дивидендная доходность"
      }
      buttonLabel="Выполнить"
    />
  );
}





