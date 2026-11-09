import Header from "@/components/Header";
import ProjectGrid from "@/components/ProjectGrid";
import { readPosts } from "@/lib/github";
export const dynamic = "force-dynamic";
export default async function Home() {
let projects: typeof FEATURED_PROJECTS[number][] = [];
  try { projects = await readPosts(); } catch { loadError = true; }
  projects.sort((a,b)=>Number(!!b.featured)-Number(!!a.featured) || new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime());
  return <main className="shell">
    <Header/>
    <section className="hero" id="about">
      <div><div className="eyebrow">A directory for the things you build / EST. 2026</div>
        <h1>Made something?<br/><em>Put it here.</em></h1>
        <p>Games, websites, tools, experiments, half-finished ideas that turned out better than expected. A home for projects made by people who make things.</p>
        <div style={{display:"flex",gap:10,marginTop:25,flexWrap:"wrap"}}><a className="btn" href="/api/auth/login">Start posting ↗</a><a className="btn dark" href="#explore">Explore projects ↓</a></div>
      </div>
      <aside className="hero-aside"><strong>{String(projects.length).padStart(2,"0")}</strong> projects shared<br/><br/><span className="mono">NO ALGORITHM. JUST BUILDS.</span></aside>
    </section>
    <section id="explore"><div className="sectionhead"><h2>THE PROJECT INDEX</h2><span className="mono">SCROLL THROUGH THE WORK</span></div>
      {loadError ? <div className="notice">The project feed could not load. Check your GitHub repository settings and environment variables.</div> : <ProjectGrid projects={projects}/>}
    </section>
    <footer className="footer"><span>© 2026 dev.hub — built for builders.</span><span>BLACK / WHITE / YOUR WORK.</span></footer>
  </main>;
}
