import { Octokit } from "octokit";
import { eq } from "drizzle-orm";

import { GITHUB_TOKEN } from "./constants";
import db from "@/db";
import { project, commit } from "@/db/schema";

export const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

const url = "https://github.com/docker/genai-stack";

type CommitHashResponseValues = {
  commitHash: string;
  commitMessage: string;
  commitDate: string;
  commitAuthorName: string;
  commitAuthorAvatar: string;
};

export async function getCommitHashes(
  githubUrl: string,
): Promise<CommitHashResponseValues[]> {
  try {
    const { data } = await octokit.rest.repos.listCommits({
      owner: "docker",
      repo: "genai-stack",
    });

    if (!Array.isArray(data)) return [];

    const sortedCommits = data
      .filter((commit) => commit.commit.author?.date)
      .sort((a, b) => {
        const dateA = new Date(a.commit.author!.date!).getTime();
        const dateB = new Date(b.commit.author!.date!).getTime();
        return dateB - dateA;
      })
      .map((commit) => ({
        commitHash: commit.sha,
        commitMessage: commit.commit.message,
        commitDate: commit.commit.author!.date!,
        commitAuthorName: commit.commit.author?.name ?? "Unknown",
        commitAuthorAvatar: commit.author?.avatar_url ?? "",
      }));

    return sortedCommits.slice(0, 10);
  } catch (error) {
    console.error("Error fetching commit hashes:", error);
    throw new Error("Failed to fetch commits");
  }
}

async function fetchProjectGithubUrl(projectId: number): Promise<string> {
  const result = await db.query.project.findFirst({
    columns: { githubUrl: true },
    where: eq(project.id, projectId),
  });
  if (!result) throw new Error("No GitHub URL found for project");
  return result.githubUrl;
}

async function filterUnprocessedCommits(
  projectId: string,
  commitHashes: CommitHashResponseValues[],
) {
  const processedCommits = await db.query.commit.findMany({
    columns: { commitHash: true },
    where: eq(commit.projectId, parseInt(projectId)),
  });

  const unprocessedCommits = commitHashes.filter(
    (commit) =>
      !processedCommits.some((c) => c.commitHash === commit.commitHash),
  );

  return unprocessedCommits;
}

async function summariseCommits(githubUrl: string, commitHash: string) {}

export async function pollCommits(projectId: string) {
  const githubUrl = await fetchProjectGithubUrl(parseInt(projectId));
  const commitHashes = await getCommitHashes(githubUrl);
  const unprocessedCommits = await filterUnprocessedCommits(
    projectId,
    commitHashes,
  );
}
