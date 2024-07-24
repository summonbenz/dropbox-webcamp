import { getServerSession  } from "next-auth";
import { LogoutBtn } from "@/components/logoutBtn";

export default async function Home() {
  const session = await getServerSession();

  return (
    <div>
      <h1>Hello, Dropbox</h1>
      <h3>{
        session?.user ? <div>Signed in! {session.user.name} </div> : <div>Sign out</div>
        }</h3>
        <div>
          <pre>
          </pre>
        </div>
        {
          session?.user ? <LogoutBtn /> : ''
        }
    </div>
  )
} 
