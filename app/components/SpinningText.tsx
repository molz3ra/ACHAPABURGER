"use client";

import React from "react";
import { motion } from "framer-motion";

interface SpinningTextProps {
  children: string;
  radius?: number;
  fontSize?: string;
  className?: string;
  duration?: number;
}

export default function SpinningText({
  children,
  radius = 120, 
  fontSize = "16px",
  className = "",
  duration = 20,
}: SpinningTextProps) {
  const CHARS = children.split("");
  const INNER_RADIUS = radius - 5;

  return (
    <motion.div
      className={`relative flex items-center justify-center font-bold tracking-widest uppercase ${className}`}
      style={{ width: `${radius * 2}px`, height: `${radius * 2}px`, fontSize }}
      animate={{ rotate: 360 }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
      }}
      suppressHydrationWarning
    >
      <svg
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        // A MÁGICA ESTÁ AQUI: overflow-visible impede que as letras sejam cortadas
        className="absolute inset-0 w-full h-full overflow-visible" 
        suppressHydrationWarning
      >
        <defs>
          <path
            id="textCircle"
            d={`M ${radius},${radius} m -${INNER_RADIUS}, 0 a ${INNER_RADIUS},${INNER_RADIUS} 0 1,1 ${INNER_RADIUS * 2},0 a ${INNER_RADIUS},${INNER_RADIUS} 0 1,1 -${INNER_RADIUS * 2},0`}
          />
        </defs>
        <text className="fill-current">
          <textPath
            href="#textCircle"
            startOffset="0%"
            className="tracking-[0.15em]"
          >
            {children}
          </textPath>
        </text>
      </svg>
    </motion.div>
  );
}