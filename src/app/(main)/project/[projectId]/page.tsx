import { eq } from "drizzle-orm";
import { Github } from "lucide-react";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { project } from "@/db/schema";
import db from "@/db";
import auth from "@/lib/auth";

const ProjectIdPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const projectId = (await params).projectId;

  const currentProject = await db.query.project.findFirst({
    columns: { name: true, githubUrl: true },
    where: eq(project.id, parseInt(projectId)),
  });
  if (!currentProject) return null;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between flex-wrap">
        <div className="border w-fit rounded-md">
          <div className="w-fit rounded-md flex  px-4 py-3">
            <Github className="size-5 " />
            <div className="ml-2">
              <p className="text-sm font-medium ">
                This project is linked to{" "}
                <Link href={currentProject.githubUrl} className="underline">
                  {currentProject.githubUrl}
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="h-4">
          <div className="flex items-center gap-4">
            Team members Invite Archive
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
          Ask question meeting
        </div>
      </div>
      <div className="mt-8">Commit log</div>
    </div>
  );
};

export default ProjectIdPage;
