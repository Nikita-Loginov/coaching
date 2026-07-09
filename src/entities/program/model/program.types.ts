import { CurrencyType } from "@/shared/types";

export type ProgramItem = {
  id: string;
  name: string;
  description: string;
  duration: {
    sessions: number;
    months: number;
  };
  price: string;
  icon: React.ReactNode;
  currency: CurrencyType;
  targetAudience: string[];
  benefits: string[];
  includes: string[];
  curriculum: ProgramModule[];
  // cvetIcon?: string;
};

export type ProgramModule = {
  title: string;
  description: string;
};
