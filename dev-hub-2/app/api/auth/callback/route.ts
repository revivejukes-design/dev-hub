import { NextRequest, NextResponse } from "next/server";
import { signSession, sessionCookieName } from "@/lib/auth";
export async function GET(req:NextRequest) {
 const code=req.nextUrl.searchParams.get("code"),state=req.nextUrl.searchParams.get("state");
 const saved=req.cookies.get("devhub_oauth_state")?.value;
 if(!code||!state||!saved||state!==saved)return NextResponse.redirect(new URL("/?auth=failed",req.url));
 const tokenRes=await fetch("https://github.com/login/oauth/access_token",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({client_id:process.env.GITHUB_CLIENT_ID,client_secret:process.env.GITHUB_CLIENT_SECRET,code})});
 const tokenData=await tokenRes.json();
 if(!tokenData.access_token)return NextResponse.redirect(new URL("/?auth=failed",req.url));
 const userRes=await fetch("https://api.github.com/user",{headers:{Authorization:`Bearer ${tokenData.access_token}`,Accept:"application/vnd.github+json"}});
 if(!userRes.ok)return NextResponse.redirect(new URL("/?auth=failed",req.url));
 const gh=await userRes.json();
 const response=NextResponse.redirect(new URL("/",req.url));
 response.cookies.set(sessionCookieName,signSession({login:gh.login,avatar_url:gh.avatar_url,name:gh.name}),{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",maxAge:60*60*24*7,path:"/"});
 response.cookies.delete("devhub_oauth_state");
 return response;
}
