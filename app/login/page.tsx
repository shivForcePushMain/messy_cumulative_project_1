import Link from "next/link"

export default function Auth(){
    return <div>
        <Link href={'api/auth/google'}>
        <button >Login in with goodle</button>
        </Link>
    </div>
}