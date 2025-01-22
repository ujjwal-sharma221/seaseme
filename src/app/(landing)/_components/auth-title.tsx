"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import VariableFontHoverByLetter from "@/components/fancy/variable-font-hover-by-letter";

export function AuthTitles() {
  return (
    <div className="size-full bg-[#FEFAF6] rounded-lg sm:text-xl xs:text-xl md:text-2xl xl:text-5xl flex flex-col items-center justify-center ">
      <div className="w-full justify-start items-center p-6 sm:p-8 md:p-12 lg:p-16">
        <div className="w-3/4">
          <h2 className="text-2xl xl:text-5xl">Login Or Signup ✽</h2>
          <ul className="flex flex-col space-y-1 mt-6  h-full cursor-pointer">
            <Link href="/login" className="flex items-center group gap-3">
              <VariableFontHoverByLetter
                label="Login"
                className="uppercase"
                staggerDuration={0.03}
                fromFontVariationSettings="'wght' 400, 'slnt' 0, 'ital'"
                toFontVariationSettings="'wght' 900, 'slnt' -90"
              />
              <ArrowRight className="xl:size-8 md:size-6 size-4 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>

            <Link href="/sign-up" className="flex items-center gap-3 group">
              <VariableFontHoverByLetter
                label="Sign Up"
                className="uppercase"
                staggerFrom={"center"}
                fromFontVariationSettings="'wght' 400, 'slnt' 0"
                toFontVariationSettings="'wght' 900, 'slnt' -10"
              />
              <ArrowRight className="xl:size-8 md:size-6 size-4 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
