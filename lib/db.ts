import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!

interface GlobalWithMongo{
    _mongoClientPromise? : Promise<MongoClient>
}

const globalWIthMongo = global as typeof globalThis & GlobalWithMongo

let client : MongoClient
let clientPromise : Promise<MongoClient>;

if(process.env.NODE_ENV==="development"){
    if(!globalWIthMongo._mongoClientPromise){
        client = new MongoClient(uri);
        globalWIthMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWIthMongo._mongoClientPromise;
}else{
    const client = new MongoClient(uri)
    clientPromise = client.connect();
}

export default async function connectDB():Promise<Db>{
    const connectedClient = await clientPromise;
    return connectedClient.db("messy_project_1");
}