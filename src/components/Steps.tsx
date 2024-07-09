"use client";

import React from "react";
import { STEPS } from "@/data/steps";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Steps = () => {
  const pathname = usePathname();
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="border-l border-zinc-600 flex flex-col md:flex-row justify-between"
    >
      {STEPS.map((step, index) => {
        const isCurrent = pathname.endsWith(step.url);
        const isCompleted = STEPS.slice(index + 1).some((step) =>
          pathname.endsWith(step.url)
        );

        const imagePath = `/panda${index + 1}.png`;

        return (
          <div key={index} className="relative w-full border-r border-gray-500">
            <span
              className={cn("absolute bottom-0 h-1 w-full bg-zinc-400", {
                "bg-zinc-700": isCurrent,
                "bg-primary": isCompleted,
              })}
            />
            <span className="flex items-center px-2 lg:px-5 text-sm lg:text-[16px] py-4 gap-x-4">
              <span>
                <img
                  src={imagePath}
                  alt=""
                  className="w-20 h-20 object-contain"
                />
              </span>
              <span className="flex flex-col space-y-1">
                <span
                  className={cn("text-zinc-700 font-semibold", {
                    "text-zinc-900": isCurrent,
                    "text-primary": isCompleted,
                  })}
                >
                  {step.name}
                </span>
                <span className="font-semibold text-gray-500 tracking-wide">
                  {step.description}
                </span>
              </span>
            </span>
          </div>
        );
      })}
    </motion.div>
  );
};

export default Steps;
