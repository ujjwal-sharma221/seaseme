import { headers } from "next/headers";

import auth from "@/lib/auth";
import { LoginCard } from "../_components/login-card";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) redirect("/main");

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <LoginCard />
    </div>
  );
};

export default LoginPage;
