"use client";

import * as React from "react";
import { motion, MotionProps, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary";
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative group px-8 py-4 rounded-xl overflow-hidden",
          variant === "primary" && "bg-primary text-primary-foreground",
          variant === "secondary" && "bg-secondary text-secondary-foreground",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="relative">{children as React.ReactNode}</span>
      </motion.button>
    );
  }
);

GradientButton.displayName = "GradientButton";

export { GradientButton };