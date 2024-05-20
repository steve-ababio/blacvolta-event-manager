"use client"
import { useState } from "react";
import { BlogPostType } from "../bloglist/bloglist";
import BlogTableRow from "../blogtablerow/blogtablerow";
import React from "react";
import DeleteEvent from "@/app/components/modal/content/delete/deletedialog";
import Modal from "@/app/components/modal/modal";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";

export default function BlogTable({data}:{data:BlogPostType[]}){
    const [loading,setLoading] = useState(false);
    const [blog,setBlog] = useState<BlogPostType>();
    const [showdeleteprompt,setShowDeletePrompt] = useState(false);

    function closeDeletePrompt(){
        setShowDeletePrompt(false);
    }
    async function deleteBlogPost(){
        setLoading(true);
        try{
            const response = await fetch(`/api/deleteblog/?id=${blog?.id}`,{method:"DELETE"});
            const message = await response.json();
            window.location.reload();
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
            closeDeletePrompt();
        }
    }   
    return(
        <div className="w-full rounded-t-[12px] pb-10 mb-4 shadow-md bg-white px-5 dark:bg-[#292b32]">
            <h1 className="py-5 font-bold text-slate-600 dark:text-white">Blogs</h1>
            <Link className="w-fit block pb-5" href="/blog">
                <button className="
                    dark:bg-white dark:text-slate-600
                    bg-black text-white px-3
                    py-2 rounded-[5px] flex gap-x-1 justify-center
                    items-center hover:bg-btnprimarybold 
                    duration-200 shadow-md "
                >
                    <FiEdit className="dark:text-slate-600 text-white " size={17} />
                    <span>create blog</span>
                </button>
            </Link>
            <div className="w-full overflow-auto pt-8">
            <table className="w-full shadow-sm">
                <thead className="bg-slate-400/30">
                    <tr className="text-left dark:text-slate-200 text-slate-600">
                        <th className="p-[0.75rem]">Author Name</th>
                        <th className="p-[0.75rem]">Date written</th>
                        <th className="p-[0.75rem]">Title</th>
                        <th className="p-[0.75rem]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((blog:BlogPostType)=>(
                            <React.Fragment key={blog.id}>
                                <BlogTableRow
                                    blog={blog}
                                    setBlog={setBlog}
                                    setShowDeletePrompt={setShowDeletePrompt}
                                />
                            </React.Fragment>
                        ))
                    }
                </tbody>
            </table>
            </div>
            <Modal open={showdeleteprompt} onclose={closeDeletePrompt}>
               <DeleteEvent 
                    closeDeletePrompt={closeDeletePrompt} 
                    deleteRecord={deleteBlogPost} 
                    loading={loading}
                    deletetext="delete blog"
                />
            </Modal>
        </div>
    )

}