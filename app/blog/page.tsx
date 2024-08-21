import { ToastContainer } from "react-toastify";
import NavBar from "../components/navbar/navbar";
import "react-toastify/dist/ReactToastify.css";
import BlogForm from "./components/blogform/blogform";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "../api/auth/[...nextauth]/options";

export default async function Blog(){
    const session = await getServerSession(authOptions);
    if(!session){
        redirect("/")
    }
    return(
        <>
            <NavBar pagetitle="Create Blog" />
            <main className=" bg-white dark:bg-transparent min-h-screen w-full">
            <div className="bg-white w-[80%] mx-auto max-w-[50rem] text-slate-600 ">
                <ToastContainer 
                    position="bottom-center"
                    theme="light"
                    hideProgressBar={true}
                    autoClose={5000}
                />
                <BlogForm />
            </div>
        </main>
        </>
    )
}