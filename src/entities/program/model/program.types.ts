import { ProgramIconKey } from "@/entities/program/lib/icon-map";
import type { CurrencyType } from "@/shared/types";

export type ProgramItem = {
  id: string;
  name: string;
  description: string;
  duration: {
    sessions: number;
    months: number;
  };
  price: string;
  icon: ProgramIconKey;
  currency: CurrencyType;
  targetAudience: string[];
  benefits: string[];
  includes: string[];
  curriculum: ProgramModule[];
  seo: {
    title: string;
    description: string;
    image: string;
    keywords?: string[];
  };
  // cvetIcon?: string;
};

export type ProgramModule = {
  title: string;
  description: string;
};
