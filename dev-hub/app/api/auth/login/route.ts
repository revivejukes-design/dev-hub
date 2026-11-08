import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
export async function GET(req:NextRequest) {
 const state=randomBytes(24).toString("hex");
 const url=new URL("https://github.com/login/oauth/authorize");
 url.searchParams.set("client_id",process.env.GITHUB_CLIENT_ID||"");
 url.searchParams.set("redirect_uri",`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`);
 url.searchParams.set("scope","read:user");url.searchParams.set("state",state);
 const response=NextResponse.redirect(url);
 response.cookies.set("devhub_oauth_state",state,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",maxAge:600,path:"/"});
 return response;
}
