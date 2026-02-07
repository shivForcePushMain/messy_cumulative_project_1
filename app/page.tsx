import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Home() {

  const cookieStore = await cookies(); 
  const userEmail = cookieStore.get("session-email")?.value

  if(!userEmail) redirect('/login')

  return (
    <div>
      <h1>Hi {userEmail}</h1>
    </div>
  );
}
