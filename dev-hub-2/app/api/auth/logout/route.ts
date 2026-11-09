import { NextResponse } from "next/server";
import { sessionCookieName } from "@/lib/auth";
export async function GET(req:Request) {
 const response=NextResponse.redirect(new URL("/",req.url));
 response.cookies.delete(sessionCookieName);return response;
}
