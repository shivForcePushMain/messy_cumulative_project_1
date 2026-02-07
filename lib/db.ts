import {Db  , MongoClient } from 'mongodb'

interface GlobalWithMongo{
    mongoClientPromise : Promise<MongoClient>
}

const uri = process.env.MONGODB_URI!

const globalWithMongo = global as typeof globalThis & GlobalWithMongo

let clientPromise : Promise<MongoClient> ;
let client : MongoClient;

if(process.env.NODE_ENV==="development"){
    if(!globalWithMongo.mongoClientPromise){
        client = new MongoClient(uri)
        globalWithMongo.mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo.mongoClientPromise
}else{
    client = new MongoClient(uri);
    clientPromise = client.connect()
}

export async function connectDB() : Promise<Db>{
    const connectedClient = await clientPromise
    return connectedClient.db("messy-prac")
}
