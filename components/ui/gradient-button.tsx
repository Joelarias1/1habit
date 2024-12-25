"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientButtonProps extends Omit<HTMLMotionProps<"button">, "className"> {
  variant?: "primary" | "secondary";
  className?: string;
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden rounded-xl px-8 py-3 font-medium transition-all",
          variant === "primary" && "bg-white text-black hover:bg-white/90",
          variant === "secondary" && "bg-white/10 text-white hover:bg-white/[0.15]",
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
GradientButton.displayName = "GradientButton";

export { GradientButton };