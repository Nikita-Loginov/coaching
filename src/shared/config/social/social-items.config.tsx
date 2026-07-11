import { FaTelegramPlane } from "react-icons/fa";
import { IoLogoVk } from "react-icons/io5";

import { PERSON_CONFIG } from "../person/person.config";

import { SocialItem } from "@/shared/types/social.types";

export const SOCIAL_ITEMS_PERSON: SocialItem[] = [
  {
    icon: <FaTelegramPlane />,
    to: PERSON_CONFIG.socials.telegram,
  },
  {
    icon: <IoLogoVk />,
    to: PERSON_CONFIG.socials.vk,
  },
];
