import { Project } from "./types";

const api = "https://api.github.com";
const owner = process.env.GITHUB_OWNER!;
const repo = process.env.GITHUB_REPO!;
const branch = process.env.GITHUB_BRANCH || "main";
const path = "data/posts.json";

function headers() {
  if (!process.env.GITHUB_TOKEN) throw new Error("Missing GITHUB_TOKEN environment variable");
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json"
  };
}
export async function readPosts(): Promise<Project[]> {
  const response = await fetch(`${api}/repos/${owner}/${repo}/contents/${path}?ref=${branch}`, {
    headers: headers(), cache: "no-store"
  });
  if (response.status === 404) return [];
  if (!response.ok) throw new Error(`GitHub read failed (${response.status})`);
  const file = await response.json();
  const decoded = Buffer.from(file.content.replace(/\n/g, ""), "base64").toString("utf8");
  return JSON.parse(decoded) as Project[];
}
export async function writePosts(posts: Project[]) {
  const get = await fetch(`${api}/repos/${owner}/${repo}/contents/${path}?ref=${branch}`, {
    headers: headers(), cache: "no-store"
  });
  if (!get.ok) throw new Error(`Could not load content file (${get.status}). Create data/posts.json in the repository first.`);
  const current = await get.json();
  const content = Buffer.from(JSON.stringify(posts, null, 2)).toString("base64");
  const response = await fetch(`${api}/repos/${owner}/${repo}/contents/${path}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify({
      message: "Update dev.hub project posts",
      content,
      sha: current.sha,
      branch
    })
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`GitHub save failed (${response.status}): ${detail}`);
  }
}
