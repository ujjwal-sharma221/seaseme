"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

import { AudioLinesIcon } from "./icons/audio-lines";
import { ChartColumnDecreasingIcon } from "./icons/chart-column-decreasing";
import { CircleDollarSignIcon } from "./icons/circle-dollar-sign";
import { HomeIcon } from "./icons/home";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "./ui/sidebar";

const NAV_ITEMS = [
  { Icon: HomeIcon, href: "/main", title: "Home" },
  { Icon: AudioLinesIcon, href: "/qa", title: "Q&A" },
  { Icon: ChartColumnDecreasingIcon, href: "/meetings", title: "Meetings" },
  { Icon: CircleDollarSignIcon, href: "/billing", title: "Billing" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between ">
      <SidebarTrigger />
      <motion.div className="flex gap-4" layout>
        <AnimatePresence initial={false}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "flex justify-center items-center font-semibold transition-colors gap-2 p-2 [&>[data-slot=label]]:transition-all",
                  isActive ? " flex-1" : "[&>[data-slot=label]]:hidden",
                )}
                style={{
                  borderRadius: 50,
                  backgroundColor: isActive ? "#000000" : "#fff",
                  color: isActive ? "white" : "inherit",
                }}
              >
                <motion.div layout className="">
                  <item.Icon />
                </motion.div>
                <motion.span data-slot="label" className="text-md mr-2">
                  {item.title}
                </motion.span>
              </Link>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <div></div>
    </nav>
  );
}
