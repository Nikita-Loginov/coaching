export type ProgramItem = {
  id: string;
  title: string;
  description: string;
  duration: {
    sessions: number;
    months: number;
  };
  price: string;
  icon: React.ReactNode;
  currency: "rub" | 'eu'
  // cvetIcon?: string;
};
