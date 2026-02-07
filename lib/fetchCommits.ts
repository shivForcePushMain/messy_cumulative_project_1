import { connectDB } from "./db";

export interface CommitObject {
    id : string , 
    message : string ,
    timestamp: string ,
    author : string ,
    modified : string[]
}

export default async function fetchCommits() : Promise<CommitObject[]>{
    const db = await connectDB();
    const data = await db.collection<CommitObject>('Commits').find({}).sort({"timestamp" : -1}).toArray();

    return data;
}