import DotPattern from "@/components/ui/dot-pattern";
import { AuthNav } from "./_components/auth-nav";
import { cn } from "@/lib/utils";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <AuthNav />
      {children}
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
        )}
      />
    </div>
  );
};

export default AuthLayout;
