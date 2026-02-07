import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import fetchCommits from "@/lib/fetchCommits";
import CommitCard from "@/components/CommitCard";

export default async function Home() {
  const user = await getSession();

  if(!user) redirect('/login')

   const data = await fetchCommits(); 

  return (
    <div>
      <h1>Hi {user.name}</h1>
      {data.length===0 ? (
        <p>No commits found</p>
      ):(
        <div role="list">
          {data.map((commit) => (
            <CommitCard key={commit.id} commit={commit} />
          ))}
        </div>
      )}
    </div>
  );
}
