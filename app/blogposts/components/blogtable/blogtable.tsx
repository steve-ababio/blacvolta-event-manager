"use client"
import { useState } from "react";
import { BlogPostType } from "../bloglist/bloglist";
import BlogTableRow from "../blogtablerow/blogtablerow";
import React from "react";
import DeleteEvent from "@/app/components/modal/content/delete/deletedialog";
import Modal from "@/app/components/modal/modal";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import TableSearch from "@/app/dashboard/components/tablesearch/tablesearch";

export default function BlogTable({data}:{data:BlogPostType[]}){
    const [loading,setLoading] = useState(false);
    const [blog,setBlog] = useState<BlogPostType>();
    const [showdeleteprompt,setShowDeletePrompt] = useState(false);
    const [blogs,setBlogs] = useState(data);

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
    function sortBlogsByDate(){
        const sortedblogs = blogs.sort(function(blog1,blog2){
            const date1 = new Date(blog1.date);
            const date2 = new Date(blog2.date);
            if(date1 > date2){
                return -1;
            }else if(date1 < date2){
                return 1;
            }
            return 0;
        });
        return sortedblogs;
    }
    const sortedblogs = sortBlogsByDate();
    return(
        <div className="w-full rounded-t-[12px] pb-10 mb-4 shadow-md bg-white px-5 dark:bg-[#292b32]">
            <h1 className="py-5 font-bold text-slate-600 dark:text-white">Blogs</h1>
            <div className="flex justify-between">
                <div>
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
                </div>
                <div className="flex gap-x-3 justify-between sm:justify-start flex-row gap-y-8 sm:gap-y-0">
                    <TableSearch type="blogs" placeholder="search blog" blogs={data} setFilteredBlogs={setBlogs}/>
                </div>
            </div>
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
                        sortedblogs.map((blog:BlogPostType)=>(
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