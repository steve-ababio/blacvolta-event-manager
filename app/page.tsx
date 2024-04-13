import { redirect } from "next/navigation";
import Login from "./components/login/login";
import { getServerSession } from "next-auth";
import authOptions from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if(session){
      redirect("/dashboard")
  }
  return (
    <>
      <Login />
    </>
  );
}
