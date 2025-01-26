import Image from "next/image";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import dog from "@/assets/dog.gif";
import { ProjectForm } from "./_components/project-form";
import auth from "@/lib/auth";

const NewProjectPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");
  return (
    <div className=" flex items-center justify-center flex-col">
      <Image src={dog} alt="dog-hero.gif" height={300} width={300} />
      <ProjectForm />
    </div>
  );
};
export default NewProjectPage;
