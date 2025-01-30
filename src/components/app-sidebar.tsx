"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
import { TextScramble } from "./ui/text-scramble";
import { Button } from "./ui/button";
import { fetchProjects } from "@/actions/fetch.projects";
import { Project } from "@/types/database-types";

export function AppSidebar() {
  const pathname = usePathname();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loadingProjects, setLoadingProjects] = useState(false);

  useEffect(() => {
    const getProjects = async () => {
      setLoadingProjects(true);
      try {
        const fetchedProjects = await fetchProjects();
        setProjects(fetchedProjects ?? []);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoadingProjects(false);
      }
    };

    getProjects();
  }, []);

  return (
    <Sidebar className="" collapsible="offcanvas" variant="floating">
      <SidebarHeader className="bg-white">
        <div className="relative flex h-[4rem] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
          <Meteors number={30} />
          <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 text-3xl">
            Seaseme
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg">
            <TextScramble className="uppercase">Projects</TextScramble>
          </SidebarGroupLabel>
          <SidebarGroupContent className="text-black">
            <div className="flex flex-col gap-1">
              {loadingProjects ? (
                <div className="animate-pulse ml-4 text-lg">...</div>
              ) : (
                projects?.map((project) => (
                  <div
                    key={project.id}
                    className={`group m-1 ${
                      pathname === `/project/${project.id}` ? "underline" : ""
                    }`}
                  >
                    <Link href={`/project/${project.id}`}>{project.name}</Link>
                  </div>
                ))
              )}
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
      <SidebarFooter className="bg-white">{/* <UserButton /> */}</SidebarFooter>
    </Sidebar>
  );
}
