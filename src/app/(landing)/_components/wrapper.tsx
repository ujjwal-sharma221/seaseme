import { headers } from "next/headers";

import auth from "@/lib/auth";
import { AuthTitles } from "./auth-title";
import { Hero } from "./hero";
import { Title } from "./title";
import { redirect } from "next/navigation";

export async function Wrapper() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) redirect("/main");

  return (
    <div className="min-h-screen  p-6">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 auto-rows-auto ">
        <div className="flex items-center justify-center">
          <Title />
        </div>

        <div className="flex items-center justify-center">
          <AuthTitles />
        </div>

        <div className="col-span-1 sm:col-span-2 flex items-center justify-center">
          <Hero />
        </div>
      </div>
    </div>
  );
}
