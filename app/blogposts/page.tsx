import { Suspense } from "react";
import NavBar from "../components/navbar/navbar";
import BlogList from "./components/bloglist/bloglist";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "../api/auth/[...nextauth]/options";

export default async function BlogPosts(){
    const session = await getServerSession(authOptions);
    if(!session){
        redirect("/")
    }
    return (
        <main className="h-full">
            <NavBar pagetitle="Blogs" />
            <div className=" h-[calc(100%-60px)] flex flex-col dark:bg-darkprimary w-full">
                <BlogList />
            </div>
        </main>
    )
}