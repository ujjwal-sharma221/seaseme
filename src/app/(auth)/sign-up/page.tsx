import { headers } from "next/headers";
import { redirect } from "next/navigation";

import auth from "@/lib/auth";
import { SignUpCard } from "../_components/sign-up-card";

const SignUpPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) redirect("/main");

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <SignUpCard />
    </div>
  );
};

export default SignUpPage;
