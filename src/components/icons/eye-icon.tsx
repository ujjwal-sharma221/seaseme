"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    pathLength: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const EyeToggleIcon = () => {
  const [isEyeOff, setIsEyeOff] = useState(false);

  const toggleEye = () => {
    setIsEyeOff(!isEyeOff);
  };

  return (
    <div
      className="cursor-pointer size-9 select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
      onClick={toggleEye}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <AnimatePresence mode="wait">
          {isEyeOff ? (
            <>
              <motion.path
                key="eye-off-1"
                d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              />
              <motion.path
                key="eye-off-2"
                d="M14.084 14.158a3 3 0 0 1-4.242-4.242"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              />
              <motion.path
                key="eye-off-3"
                d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              />
              <motion.path
                key="eye-off-4"
                d="m2 2 20 20"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              />
            </>
          ) : (
            <>
              <motion.path
                key="eye-1"
                d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              />
              <motion.circle
                key="eye-2"
                cx="12"
                cy="12"
                r="3"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              />
            </>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
};

export { EyeToggleIcon };
