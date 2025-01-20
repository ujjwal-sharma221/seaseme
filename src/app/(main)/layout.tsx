import { Navbar } from "@/components/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-2">
      <Navbar />
      {children}
    </div>
  );
};
export default MainLayout;
