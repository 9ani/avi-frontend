import type { ElementType } from "react";
import {
  CbondsMonitoringIcon,
  Shablonizator,
  AgentTranskribator,
  Makrovestnik,
  TorgoviyProfil,
  ReitingoviyVestnik,
  QaAgent,
  ObzorPoEmittentam,
  PortfelniyVestnik,
} from "@public/icons";

export interface NavItem {
  title: string;
  href: string;
  logo?: ElementType;
}

export const navigation: NavItem[] = [
  {
    title: "Cbonds Монитор",
    href: "/cbonds-monitor",
    logo: CbondsMonitoringIcon,
  },
  { title: "Шаблонизатор", href: "/shablonizator", logo: Shablonizator },
  { title: "Рейтинговый вестник", href: "/reitingoviy-vestnik", logo: ReitingoviyVestnik },
  { title: "Портфельный вестник", href: "/portfelniy-vestnik", logo: PortfelniyVestnik },
  { title: "Обзор по эмитентам", href: "/obzor-po-emittentam", logo: ObzorPoEmittentam },
  { title: "Q&A агент", href: "/qa-agent", logo: QaAgent },
  { title: "Торговый профиль", href: "/torgoviy-profil", logo: TorgoviyProfil },
  { title: "Макровестник", href: "/makrovestnik", logo: Makrovestnik },
  { title: "Агент транскрибатор", href: "/agent-transkribator", logo: AgentTranskribator },
];





