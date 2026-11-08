export type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  url: string;
  image?: string;
  tags: string[];
  author: string;
  authorAvatar?: string;
  createdAt: string;
  featured?: boolean;
};
export type SessionUser = { login: string; avatar_url: string; name?: string };
