import { NextResponse } from "next/server";

export function GET(){
    const base = 'https://accounts.google.com/o/oauth2/v2/auth'

    const params = new URLSearchParams({
        client_id : process.env.GOOGLE_CLIENT_ID!,
        redirect_uri : process.env.GOOGLE_REDIRECT_URI!,
        scope : "openid email profile" ,
        response_type :"code" ,
        prompt :"consent"
    })

    return NextResponse.redirect(`${base}?${params.toString()}`)
}