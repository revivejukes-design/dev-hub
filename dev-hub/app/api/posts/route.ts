import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { readPosts, writePosts } from "@/lib/github";
import { Project } from "@/lib/types";
import { randomUUID } from "crypto";
function slugify(s:string){return s.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,55)||"project";}
export async function GET(){try{return NextResponse.json(await readPosts());}catch(e){return NextResponse.json({error:"Could not load projects"},{status:500});}}
export async function POST(req:NextRequest){
 const user=await getUser();if(!user)return NextResponse.json({error:"Sign in with GitHub first."},{status:401});
 try{
  const body=await req.json();const title=String(body.title||"").trim(),description=String(body.description||"").trim(),url=String(body.url||"").trim();
  if(!title||!description||!url)return NextResponse.json({error:"Title, description, and project link are required."},{status:400});
  if(title.length>60||description.length>500)return NextResponse.json({error:"Title or description is too long."},{status:400});
  const posts=await readPosts();let slug=slugify(title),base=slug,n=2;while(posts.some(p=>p.slug===slug))slug=`${base}-${n++}`;
  const post:Project={id:randomUUID(),title,slug,description,category:["Games","Websites","Tools","Experiments","Other"].includes(body.category)?body.category:"Other",url,image:typeof body.image==="string"?body.image.slice(0,500):"",tags:String(body.tags||"").split(",").map((x:string)=>x.trim()).filter(Boolean).slice(0,8),author:user.login,authorAvatar:user.avatar_url,createdAt:new Date().toISOString()};
  posts.unshift(post);await writePosts(posts);return NextResponse.json({slug});
 }catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Save failed."},{status:500});}
}
export async function DELETE(req:NextRequest){
 const user=await getUser();if(!user)return NextResponse.json({error:"Sign in first."},{status:401});
 const id=req.nextUrl.searchParams.get("id");if(!id)return NextResponse.json({error:"Missing post id."},{status:400});
 try{const posts=await readPosts(),post=posts.find(p=>p.id===id);if(!post)return NextResponse.json({error:"Post not found."},{status:404});if(post.author!==user.login)return NextResponse.json({error:"You can only delete your own posts."},{status:403});await writePosts(posts.filter(p=>p.id!==id));return NextResponse.json({ok:true});}
 catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Delete failed."},{status:500});}
}
