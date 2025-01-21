import {
  Sidebar,
  SidebarContent,
  // SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Meteors } from "./ui/meteors";

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
          <SidebarGroupLabel className="text-lg ">Projects</SidebarGroupLabel>
          <SidebarGroupContent className="text-black">
            <div>dfsasd</div>
            <div>dfsasd</div>
            <div>dfsasd</div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
