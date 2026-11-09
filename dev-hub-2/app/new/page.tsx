import Header from "@/components/Header";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import NewPostForm from "./NewPostForm";
export const dynamic = "force-dynamic";
export default async function NewPost() {
  const user = await getUser();
  if (!user) redirect("/api/auth/login");
  return <main className="shell"><Header/><div className="page"><div className="eyebrow">CONTRIBUTE / 001</div><h1>Put your work out there.</h1><p>One post per project. Add as many as you've made.</p><NewPostForm/></div></main>;
}
