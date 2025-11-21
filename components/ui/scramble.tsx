"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

interface ScrambleHoverProps {
  text: string;
  className?: string;
}

const ScrambleHover: React.FC<ScrambleHoverProps> = ({ text, className }) => {
  return (
    <motion.span className={cn("inline-block whitespace-pre-wrap", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{text}</span>
    </motion.span>
  );
};

export default ScrambleHover;
