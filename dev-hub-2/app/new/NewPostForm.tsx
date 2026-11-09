 "use client";
import { useState } from "react";
export default function NewPostForm() {
 const [busy,setBusy]=useState(false),[error,setError]=useState("");
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();setBusy(true);setError("");
  const data=new FormData(e.currentTarget);
  const payload=Object.fromEntries(data.entries());
  const res=await fetch("/api/posts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
  const result=await res.json();
  if(res.ok) location.href=`/project/${result.slug}`; else {setError(result.error||"Could not publish.");setBusy(false);}
 }
 return <form className="form" onSubmit={submit}>
  <div className="field"><label>Project name</label><input name="title" required maxLength={60} placeholder="e.g. Nightfall — a co-op horror game"/></div>
  <div className="field"><label>What is it?</label><textarea name="description" required maxLength={500} placeholder="A short, clear description of what you made..."/></div>
  <div className="formrow"><div className="field"><label>Category</label><select name="category"><option>Games</option><option>Websites</option><option>Tools</option><option>Experiments</option><option>Other</option></select></div><div className="field"><label>Project link</label><input name="url" type="url" required placeholder="https://..."/></div></div>
  <div className="field"><label>Cover image URL (optional)</label><input name="image" type="url" placeholder="https://..."/></div>
  <div className="field"><label>Tags (comma separated)</label><input name="tags" placeholder="unity, nextjs, vr"/></div>
  <div className="notice">Your GitHub username will appear as the creator. You can publish multiple projects.</div>
  {error&&<div className="error">{error}</div>}<button className="btn" disabled={busy}>{busy?"Publishing...":"Publish project ↗"}</button>
 </form>;
}
