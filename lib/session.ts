import { JWTPayload, jwtVerify , SignJWT } from "jose";
import { cookies } from "next/headers";

const secret = process.env.JWT_SECRET

interface SessionPayload extends JWTPayload {
    name: string ,
    email : string
}

const key = new TextEncoder().encode(secret)

export const encrypt = async (payload : { email : string , name : string})=>{
    return await new SignJWT(payload)
    .setProtectedHeader({alg:'HS256'})
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(key)
}

export const decrypt = async (input : string) : Promise<SessionPayload>=> {
    const {payload} = await jwtVerify(input , key , {
        algorithms:['HS256'],
    });
    return payload as SessionPayload;
}

export const getSession = async ()=>{
    const session = (await cookies()).get("messy-session")?.value
    if(!session) return null;
    try{
        return await decrypt(session)
    }catch(e){
        console.log("error "+ e)
        return null
    }
}