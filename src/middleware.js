import { NextResponse,NextRequest } from "next/server";

export function middleware(request = NextRequest){
    const path = request.nextUrl.pathname
    const isPublic = path === "/login" || path === "/signup" || path === "/"

    const token = request.cookies.get("token")
    if(isPublic && token){
        return NextResponse.redirect(new URL("/",request.nextUrl))
    }

    if(!isPublic && !token){
        return NextResponse.redirect(new URL("/login",request.nextUrl))
    }

} 

export const config = {
    matcher :[
        '/',
        '/profile',
        '/login',
        '/signup'
    ]
}