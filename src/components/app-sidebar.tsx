import { Plus } from "lucide-react";

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

export function AppSidebar() {
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
            <div>dfsasd</div>
            <div>dfsasd</div>
            <div>dfsasd</div>
          </SidebarGroupContent>
        </SidebarGroup>
        <Button className="group m-1" variant="secondary">
          <Plus
            className="-ms-1 me-2 opacity-60"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          New Project
        </Button>
      </SidebarContent>
      <SidebarFooter className="bg-white">
        <UserButton />
      </SidebarFooter>
    </Sidebar>
  );
}
