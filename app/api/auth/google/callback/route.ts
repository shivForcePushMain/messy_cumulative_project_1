import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { cookies } from "next/headers";

export async function GET(req : Request){
    const {searchParams , origin} = new URL(req.url);
    const code = searchParams.get("code");

    if(!code) return NextResponse.json({error:"No code"} , {status : 400});

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token" , {
        method : "POST" ,
        headers : {
            "Content-type":"application/x-www-form-urlencoded"
        } ,
        body : new URLSearchParams({
            code ,
            client_id : process.env.GOOGLE_CLIENT_ID! ,
            client_secret : process.env.GOOGLE_CLIENT_SECRET!,
            grant_type : "authorization_code",
            redirect_uri : process.env.GOOGLE_REDIRECT_URI!
        })
    })

    const tokenData = await tokenResponse.json();
    console.log(tokenData)
    const accessToken = tokenData.access_token;

    const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo" , {
        method :"GET" ,
        headers : {
            Authorization :"Bearer "+accessToken
        }
    })

    const userObject = await userRes.json();

    const db = await connectDB();
    const user = await db.collection("Users").updateOne({email : userObject.email } , {
        $set :{
        name : userObject.name ,
        refresh_token : tokenData.refresh_token
    } 
}, {upsert : true})

    const cookieStore = await cookies();

    cookieStore.set("session-email" , userObject.email , {
        httpOnly: true ,
        path: "/"
    })

    return NextResponse.redirect(`${origin}/`)
}