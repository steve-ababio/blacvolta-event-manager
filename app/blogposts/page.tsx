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
                <Suspense fallback={<div className="
                        h-full w-full flex text-slate-600
                        dark:text-white text-[20px] font-semi-bold
                        justify-center items-center"
                    >
                        Loading blogs
                    </div>
                }>
                    <BlogList />
                </Suspense>
                
            </div>
        </main>
    )
}