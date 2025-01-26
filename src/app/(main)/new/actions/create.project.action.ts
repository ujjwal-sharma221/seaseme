"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { CreateFormValues } from "../_components/project-form";
import auth from "@/lib/auth";
import db from "@/db";
import { schema } from "@/db/schema";

export async function createProject(values: CreateFormValues) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) throw new Error("Unauthorized");

  try {
    await db.insert(schema.project).values({
      userId: session.user.id,
      githubUrl: values.githubUrl,
      name: values.projectName,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    revalidatePath("/");
    revalidatePath("/new");
  } catch (error) {
    console.error(error);
  }
}
