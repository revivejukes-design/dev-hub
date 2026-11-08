import Header from "@/components/Header";
import { readPosts } from "@/lib/github";
import { getUser } from "@/lib/auth";
import { notFound } from "next/navigation";
import ManageButtons from "./ManageButtons";
export const dynamic = "force-dynamic";
export default async function ProjectPage({params}:{params:{slug:string}}) {
 const posts=await readPosts();const p=posts.find(x=>x.slug===params.slug);if(!p)notFound();
 const user=await getUser();
 return <main className="shell"><Header/><article className="page">
  <div className="eyebrow">{p.category} / POSTED {new Date(p.createdAt).toLocaleDateString()}</div><h1>{p.title}</h1><p>By @{p.author}</p>
  <div className="detail-art">{p.image?<img src={p.image} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span>{p.title.slice(0,2).toUpperCase()}</span>}</div>
  <p className="detail-copy">{p.description}</p><div className="tags">{p.tags.map(t=><span className="tag" key={t}>{t}</span>)}</div>
  <div className="actions"><a className="btn" href={p.url} target="_blank" rel="noreferrer">Open project ↗</a><a className="btn dark" href="/">Back to the hub</a></div>
  {user?.login===p.author&&<ManageButtons id={p.id}/>}
 </article></main>;
}
