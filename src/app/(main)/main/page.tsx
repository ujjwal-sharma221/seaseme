import { redirect } from "next/navigation";
import { headers } from "next/headers";

import auth from "@/lib/auth";

const MainPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  return <div>Main</div>;
};
export default MainPage;
