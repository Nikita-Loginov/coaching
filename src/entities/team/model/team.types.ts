import { StaticImageData } from "next/image";

export type TeamItem = {
  post: string;
  name: string;
  middlename: string;
  id: string;
  img: string | StaticImageData;
  socials?: {
    telegram: string,
    vk: string,
  },
  city?: string;
  info: string[];
  specializing: string[];
  certification: string[];
  principle: string;
};
