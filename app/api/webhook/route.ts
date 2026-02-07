import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import crypto from 'crypto'

export async function POST(req: Request){
    const db = await connectDB();
    const secret = process.env.GITHUB_WEBHOOK_SECRET!
    try{
        const signature = req.headers.get('x-hub-signature-256')

        const rawBody = await req.text();

        const hmac = crypto.createHmac('sha256' , secret)
        const digest = "sha256="+hmac.update(rawBody).digest('hex')

        if(signature!==digest){
            return NextResponse.json({status : 401 , message: "invalid sign webhook"})
        }

        const body = await JSON.parse(rawBody);
        const commit = body.commits[0]
        const commitObject = {
            id : commit.id ,
            message : commit.message ,
            timestamp : commit.timestamp,
            author : commit.author.name,
            modified : commit.modified
        }

        console.log(commitObject)

        await db.collection('Commits').insertOne(commitObject)

        return NextResponse.json({message: "Success"})
    }
    catch(e){
        console.log({error : e})
        return NextResponse.json({status : 400 , message : "invalid"} )
    }
}