import { cubicBezier, easeOut } from "framer-motion";

export const headerVisible = {
  initial: {
    opacity: 0,
    y: -30,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  transition: {
    duration: 0.2,
    ease: "easeOut" as const,
  },
};