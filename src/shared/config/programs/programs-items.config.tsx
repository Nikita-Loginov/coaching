import { User, Users, Briefcase } from "lucide-react";

import type { ProgramItem } from "@/entities/program/model/program.types";

export const PROGRAMS_ITEMS: ProgramItem[] = [
  {
    id: "individual-coaching",
    title: "Индивидуальный коучинг",
    description:
      "Персональная работа с коучем для достижения ваших целей. Глубинная трансформация мышления и переход на новый уровень.",
    duration: {
      sessions: 8,
      months: 3,
    },
    price: "50 000",
    currency: "rub",
    icon: <User size="32" />,
  },
  {
    id: "team-coaching",
    title: "Командный коучинг",
    description:
      "Синхронизация команды, разрешение конфликтов, настройка на общий результат и достижение целей через коллективную работу.",
    duration: {
      sessions: 10, 
      months: 2,
    },
    price: "150 000",
    currency: "rub",
    icon: <Users size="32" />,
  },
  {
    id: "executive-coaching",
    title: "Executive коучинг",
    description:
      "Для первых лиц и CEO. Стратегическое видение, баланс и масштаб личности. Работа на уровне системного мышления и лидерства.",
    duration: {
      sessions: 10,
      months: 6,
    },
    price: "300 000",
    currency: "rub",
    icon: <Briefcase size="32" />,
  },
];