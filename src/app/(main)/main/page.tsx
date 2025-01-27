import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Plus } from "lucide-react";

import auth from "@/lib/auth";
import { ProjectTable } from "./_components/project-table";
import { Button } from "@/components/ui/button";
import { GlowEffect } from "@/components/ui/glow-effect";
import Link from "next/link";

const MainPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  return (
    <div className="mt-4 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <div className="relative">
          <GlowEffect
            colors={["#FF5733", "#33FF57", "#3357FF", "#F1C40F"]}
            mode="colorShift"
            blur="soft"
            duration={3}
            scale={0.9}
          />
          <Button
            asChild
            className="relative inline-flex items-center gap-1 rounded-md bg-zinc-950 px-2.5 py-1.5 text-sm text-zinc-50 outline outline-1 outline-[#fff2f21f]"
          >
            <Link href="/new">
              New Project <Plus className="h4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      <ProjectTable />
    </div>
  );
};
export default MainPage;
