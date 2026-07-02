import { Send } from "lucide-react";
import { IoLogoVk } from "react-icons/io5";

import { PERSON_CONFIG } from "@/shared/config/person/person.config";

export const SOCIALS_ITEMS = [
  {
    icon: <Send />,
    to: PERSON_CONFIG.socials.telegram,
  },
  {
    icon: <IoLogoVk />,
    to: PERSON_CONFIG.socials.vk,
  },
];
