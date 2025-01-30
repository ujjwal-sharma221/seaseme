import { project } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Github } from "lucide-react";
import Link from "next/link";

import db from "@/db";

const ProjectIdPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const projectId = (await params).projectId;

  const currentProject = await db.query.project.findFirst({
    columns: { name: true, githubUrl: true },
    where: eq(project.id, parseInt(projectId)),
  });
  if (!currentProject) return null;

  return (
    <div>
      <div className="flex justify-between items-center gap-y-4 flex-wrap border w-fit rounded-md">
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
    </div>
  );
};
export default ProjectIdPage;
