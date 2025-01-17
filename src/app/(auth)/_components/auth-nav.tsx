"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import ComesInGoesOutUnderline from "@/components/fancy/underline-comes-in-goes-out";
import { cn } from "@/lib/utils";

export function AuthNav() {
  const navItems = [
    { lable: "Home", href: "/" },
    { lable: "Login", href: "/login" },
    { lable: "Sign Up", href: "/sign-up" },
  ];

  const pathname = usePathname();
  return (
    <div>
      <div className="flex items-center gap-2 mt-4 text-lg">
        {navItems.map((item, idx) => (
          <Link
            href={item.href}
            key={idx}
            className={cn(pathname === item.href && "font-bold")}
          >
            <ComesInGoesOutUnderline className="" label={item.lable} />
          </Link>
        ))}
      </div>
    </div>
  );
}
