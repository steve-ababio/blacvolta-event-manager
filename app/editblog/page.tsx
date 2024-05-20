import EditEventForm from "../components/editform/editform";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "../api/auth/[...nextauth]/options";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../components/navbar/navbar";
import EditBlogForm from "./components/editblog";

export default async function EditBlog(params:{searchParams:{bloginfo:string,paragraphs:string}}){
    const session = await getServerSession(authOptions);
    if(!session){
        redirect("/")
    }
    return (
        <>
            <NavBar pagetitle="Edit Blog"/>
            <main className="dark:bg-darkprimary pt-2 bg-white min-h-screen w-full">
                <div className="bg-white w-[80%] mx-auto max-w-[50rem] text-slate-600 ">
                    <ToastContainer 
                        position="top-center"
                        theme="light"
                        hideProgressBar={true}
                        autoClose={5000}
                    />
                    <EditBlogForm {...params.searchParams}/>
                </div>
            </main>
        </>
    )
}