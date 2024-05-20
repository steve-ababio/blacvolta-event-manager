import { useEffect, useRef, useState } from "react";
import { BlogPostType } from "../bloglist/bloglist";
import { BsThreeDots } from "react-icons/bs";
import Link from "next/link";
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

interface TableRowProps{
    blog:BlogPostType,
    setShowDeletePrompt:React.Dispatch<React.SetStateAction<boolean>>
    setBlog:React.Dispatch<React.SetStateAction<BlogPostType|undefined>>
}   

export default function BlogTableRow({blog,setBlog,setShowDeletePrompt}:TableRowProps){
    const {author,date,imagepath,id,title,paragraph} = blog;
    const bloginfo = {author,date,id,title,imagepath};
    const [viewaction,setViewAction] = useState(false);
    const activeelement = useRef<HTMLDivElement>(null);

    function showDeletePrompt(){
        setBlog({...blog});
        setShowDeletePrompt(true);
    }
    function showAction(){
        setViewAction(true);            
    }
    useEffect(function(){
        window.addEventListener("click",closeActionMenu);
        return function(){
            window.removeEventListener("click",closeActionMenu);
        }
    },[]);
    
    function closeActionMenu(e:MouseEvent){
        if(!activeelement.current?.contains(e.target as HTMLDivElement)){
            setViewAction(false);
        }
    }
    return(
        <>
            <tr className="w-full dark:text-slate-200 text-slate-600 border-b border-b-gray-400/50 text-[14px]">
                <td className="align-top p-[.75rem]">{author}</td>
                <td className="align-top p-[.75rem]">{date}</td>
                <td className="align-top p-[.75rem]">{title}</td>
                <td className="p-[0.75rem] flex gap-1 items-center">
                    <div className="relative cursor-pointer">
                        <div ref={activeelement} onClick={showAction} className="hover:bg-slate-300/30 p-1 rounded-[5px]">
                            <BsThreeDots size={20}/>
                            <div className={`
                                ${viewaction ? 'scale-100':'scale-0'} 
                                z-30 duration-300 px-4 w-[10rem] shadow-md
                                py-3 absolute right-0 bottom-full
                                dark:border dark:bg-darkprimary bg-white 
                                dark:border-slate-300/20 rounded-md
                                `
                            }>
                                <Link href={{pathname:`/editblog`,query:{bloginfo:JSON.stringify(bloginfo),paragraphs:JSON.stringify(paragraph)}}}>
                                    <button className="flex items-center gap-x-4 mb-2 py-1 rounded-md hover:bg-slate-300/30 pl-2 w-full">
                                        <MdOutlineEdit size={20} />
                                        <div className="text-[14px] items-center flex flex-1">edit</div>
                                    </button>
                                </Link>
                                <button onClick={showDeletePrompt} className="flex py-1 items-center rounded-md gap-x-4 mb-2 pl-2 hover:bg-slate-300/30 w-full">
                                    <AiOutlineDelete size={20} color="rgb(239 68 68)" />
                                    <div className="text-[14px] items-center text-red-500 flex flex-1">delete</div>
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </td>             
            </tr>
        </>
    )
}