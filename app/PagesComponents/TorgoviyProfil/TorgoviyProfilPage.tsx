import { PageInputsIntro } from "@/app/components/common/Intro/PageInputsIntro";
import { Send, TorgoviyProfil } from "@/public/icons";

export function TorgoviyProfilPage() {
  return (
    <PageInputsIntro
      logo={<TorgoviyProfil w={40} h={40} />}
      ActionIcon={<Send />}
      title={<>Торговый профиль</>}
      helperText="Введите ID документа договора клиента"
      firstLabel=""
      firstPlaceholder="100011"
      buttonLabel="Выполнить"
    />
  );
}





