import { ToastContainer } from "react-toastify";
import NavBar from "../components/navbar/navbar";
import "react-toastify/dist/ReactToastify.css";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "../api/auth/[...nextauth]/options";
import BlogForm from "../blog/components/blogform/blogform";

export default async function DettyDecember(){
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
                <BlogForm submiturl="/api/createdettydecemberblog" />
            </div>
        </main>
        </>
    )
}