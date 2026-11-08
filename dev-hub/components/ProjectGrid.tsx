 "use client";
import { useMemo, useState } from "react";
import { Project } from "@/lib/types";
const categories = ["All", "Games", "Websites", "Tools", "Experiments", "Other"];
export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [category,setCategory] = useState("All");
  const [query,setQuery] = useState("");
  const filtered = useMemo(() => projects.filter(p =>
    (category === "All" || p.category === category) &&
    `${p.title} ${p.description} ${p.tags.join(" ")} ${p.author}`.toLowerCase().includes(query.toLowerCase())
  ),[projects,category,query]);
  return <>
    <div className="filters">{categories.map(c=><button key={c} className={`filter ${category===c?"active":""}`} onClick={()=>setCategory(c)}>{c}</button>)}</div>
    <div className="sectionhead" style={{borderTop:0,paddingTop:0}}>
      <h2>{filtered.length.toString().padStart(2,"0")} projects in the hub</h2>
      <input className="search" placeholder="Search projects..." value={query} onChange={e=>setQuery(e.target.value)}/>
    </div>
    <div className="grid">
      {filtered.length ? filtered.map(p=><a href={p.id.startsWith("featured-") ? p.url : `/project/${p.slug}`} target={p.id.startsWith("featured-") ? "_blank" : undefined} rel={p.id.startsWith("featured-") ? "noreferrer" : undefined} className="project" key={p.id}>
        <div className="project-art">{p.image ? <img src={p.image} alt="" /> : <span>{p.title.slice(0,2).toUpperCase()}</span>}</div>
        <div className="project-body">
          <div className="project-top"><span className="category">{p.category}</span>{p.featured&&<span className="category">✳ Featured</span>}</div>
          <h3>{p.title}</h3><p>{p.description}</p>
          <div className="tags">{p.tags.slice(0,3).map(t=><span className="tag" key={t}>{t}</span>)}</div>
          <div className="project-foot" style={{marginTop:18}}><span>BY @{p.author}</span><span>{p.id.startsWith("featured-") ? "JOIN DISCORD ↗" : "VIEW PROJECT ↗"}</span></div>
        </div>
      </a>) : <div className="empty">Nothing here yet. Try another filter or search.</div>}
    </div>
  </>;
}
