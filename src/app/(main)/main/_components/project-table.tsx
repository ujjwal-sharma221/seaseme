import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/db";
import { project } from "@/db/schema";
import auth from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { FilePenLineIcon } from "@/components/ui/file-pen-line";
import { DeleteIcon } from "@/components/ui/delete";

export async function ProjectTable() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return null;

  const projects = await db
    .select({
      name: project.name,
      id: project.id,
    })
    .from(project)
    .where(eq(project.userId, session.user.id));

  if (projects.length === 0) redirect("/new");

  return (
    <Table className="">
      <TableCaption>A list of all your projects</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-3/4">Name</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell className="font-medium">
              <Link href={`/project/${project.id}`}>{project.name}</Link>
            </TableCell>

            <TableCell>
              <Button variant="secondary">
                <span className="hidden lg:block">Edit Project</span>
                <FilePenLineIcon />
              </Button>
            </TableCell>
            <TableCell>
              <Button variant="destructive">
                <span className="hidden lg:block">Delete Project</span>
                <DeleteIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
