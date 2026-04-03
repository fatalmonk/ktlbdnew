import type { LucideIcon } from "lucide-react";
import { createLazyIconWrapper } from "@/lib/lucide-icons";

export const values = [
  {
    icon: createLazyIconWrapper("Target") as LucideIcon,
    title: "Quality Excellence",
    description: "Delivering premium quality products",
  },
  {
    icon: createLazyIconWrapper("Leaf") as LucideIcon,
    title: "Sustainability",
    description: "Eco-friendly manufacturing practices",
  },
  {
    icon: createLazyIconWrapper("Shield") as LucideIcon,
    title: "Ethical Standards",
    description: "Fair labor and ethical production",
  },
  {
    icon: createLazyIconWrapper("Factory") as LucideIcon,
    title: "Innovation",
    description: "Cutting-edge manufacturing technology",
  },
];
