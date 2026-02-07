import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function Home() {
  const user = await getSession();

  if(!user) redirect('/login')

  return (
    <div>
      <h1>Hi {user.name}</h1>
    </div>
  );
}
