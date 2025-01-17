import { AuthNav } from "./_components/auth-nav";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <AuthNav />
      {children}
    </div>
  );
};

export default AuthLayout;
