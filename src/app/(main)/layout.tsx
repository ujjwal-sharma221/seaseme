import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <div className="p-2 w-full">
        <Navbar />
        {children}
      </div>
    </SidebarProvider>
  );
};
export default MainLayout;
