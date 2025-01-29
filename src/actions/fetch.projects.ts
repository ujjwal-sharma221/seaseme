"use server";

import { headers } from "next/headers";
import { eq } from "drizzle-orm";

import auth from "@/lib/auth";
import db from "@/db";
import { project } from "@/db/schema";
import { Project } from "@/types/database-types";

export async function fetchProjects(): Promise<Project[] | null> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;

  try {
    const projects = await db
      .select({
        name: project.name,
        id: project.id,
        githubUrl: project.githubUrl,
      })
      .from(project)
      .where(eq(project.userId, session.user.id));

    return projects ?? [];
  } catch (error) {
    console.error("Database error:", error);
    return [];
  }
}
