import Link from "next/link";
import { getUser } from "@/lib/auth";
export default async function Header() {
  const user = await getUser();
  return <header className="nav">
    <Link className="brand" href="/">dev<span>.</span>hub</Link>
    <nav className="navlinks"><a href="/#explore">Explore</a><a href="/#about">About</a><a href="https://github.com" target="_blank" rel="noreferrer">GitHub ↗</a></nav>
    <div className="navright">
      {user ? <><img className="avatar" src={user.avatar_url} alt="" /><span className="mono">@{user.login}</span><Link className="btn" href="/new">＋ New post</Link><a className="mono mutedlink" href="/api/auth/logout">Log out</a></> : <a className="btn" href="/api/auth/login">Sign in with GitHub ↗</a>}
    </div>
  </header>;
}
