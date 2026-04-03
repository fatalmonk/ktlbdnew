import type { Variants } from "framer-motion";

export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInUpTransition = { duration: 0.6 };
