import { Plus } from "lucide-react";
import Link from "next/link";
import { headers } from "next/headers";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Meteors } from "./ui/meteors";
import { UserButton } from "./user-button";
import { TextScramble } from "./ui/text-scramble";
import { Button } from "./ui/button";
import auth from "@/lib/auth";

import db from "@/db";
import { project } from "@/db/schema";
import { eq } from "drizzle-orm";
import UnderlineToBackground from "./fancy/underline-to-background";

export async function AppSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return null;

  const projects = await db
    .select({
      name: project.name,
      id: project.id,
    })
    .from(project)
    .where(eq(project.userId, session.user.id));

  return (
    <Sidebar className="" collapsible="offcanvas" variant="floating">
      <SidebarHeader className="bg-white">
        <div className="relative flex h-[4rem] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background ">
          <Meteors number={30} />
          <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center  font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 text-3xl">
            Seaseme
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg">
            <TextScramble className=" uppercase">Projects</TextScramble>
          </SidebarGroupLabel>
          <SidebarGroupContent className="text-black">
            <div className="flex flex-col gap-1">
              {projects.map((project) => (
                <Link
                  href={`/projects/${project.id}`}
                  className="ml-2 font-semibold text-primary hover:text-muted-foreground truncate"
                  key={project.id}
                >
                  {project.name}
                </Link>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
        <Button className="group m-1" variant="secondary" asChild>
          <Link href="/new">
            <Plus
              className="-ms-1 me-2 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            New Project
          </Link>
        </Button>
      </SidebarContent>
      <SidebarFooter className="bg-white">
        <UserButton />
      </SidebarFooter>
    </Sidebar>
  );
}
