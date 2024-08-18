"use client"
import React, {useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsFolderPlus } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";
import Error from "@/app/components/error/error";
import { IoImageOutline } from "react-icons/io5";
import BlogFormControl, { BlogFormType } from "@/app/blog/components/blogformcontrol/blogformcontrol";
import { ParagraphType } from "@/app/blogposts/components/bloglist/bloglist";
import { Slide, toast } from "react-toastify";
import Modal from "@/app/components/modal/modal";
import { FaCross } from "react-icons/fa";
import { Loader } from "@/app/components/loader/loader";

type Paragraph = {
    body:string,
    id:string,
    blogID:string,
    position:string,
    image?:File|null,
    imagename?:string,
    imagepath:string,
    instagrampostlink:string
}

export default function EditBlogForm(props:{bloginfo:string,paragraphs:string}){
    const [paragraphs,setParagraphs] = useState<Paragraph[]>([]);
    const [deletedparagraphs,setDeletedParagraphs] = useState<Paragraph[]>([])
    const [blogfilename,setBlogFileName] = useState("");
    const [showparagraphmodal,setShowParagraphModal] = useState(false);
    const {author,title,date,imagepath,id} = JSON.parse(props.bloginfo);
    const blogimage = useRef<File>();
    const paragraph = JSON.parse(props.paragraphs) as Paragraph[];

    const{
        register,
        handleSubmit,
        formState:{isSubmitting,errors,},
        clearErrors
    } = useForm<BlogFormType>({
        mode:"onChange",
        defaultValues:{
            authorname:author,
            blogtitle:title,
            datewritten:date,
        }
    });
    useEffect(function(){
        setParagraphs([...paragraph]);
    },[]);

    console.log("paragraphs: ",paragraphs);
    const submitFormData:SubmitHandler<BlogFormType> = async(data)=>{
        const formdata = new FormData();
        formdata.append("blogtitle",data.blogtitle);
        formdata.append("authorname",data.authorname);
        formdata.append("datewritten",data.datewritten);
        formdata.append("id",id);
        if(blogimage.current){
            formdata.append("blogimage",blogimage.current);
        }else{
            formdata.append("blogimage",imagepath);
        }
        for(let i = 0;i < paragraphs.length;i++){
            if(paragraphs[i].image instanceof File){
                formdata.append(`paragraphs[${i}]-image`,paragraphs[i].image!)
            }
            formdata.append("paragraph",JSON.stringify(paragraphs[i])); 
        }
        formdata.append("deletedparagraphs",JSON.stringify(deletedparagraphs));
        try{
            const response = await fetch("/api/editblog",{method:"PUT",body:formdata});
            const {message,updatedparagraphs} = await response.json();
            toast.success(message,{
                transition:Slide,
                position:"bottom-center"
            });
            setDeletedParagraphs([]);
            setParagraphs(updatedparagraphs);
        }catch(error){
            console.log(error)
        }
    }
    
    function addParagraph(){
        const lastindex = paragraphs.length - 1;
        const positionvalue = parseInt(paragraphs[lastindex].position,10) + 1;
        const position = positionvalue.toString();
        setParagraphs([...paragraphs,{body:"",id:"",blogID:id,position,instagrampostlink:"",image:null,imagepath:"",imagename:""}]);
    }
    function ObtainBlogImageFile(e:React.ChangeEvent<HTMLInputElement>){
        if(e.target.files && e.target.files.length){
            setBlogFileName(e.target.files[0].name);
            blogimage.current = e.target.files[0];
        }
    }
    function handleParagraphBody(e:React.ChangeEvent<HTMLTextAreaElement>,index:number){
        updateParagraph(index,e.target.value,"body");
    }
    function updateParagraph(index:number,value:any,key:keyof ParagraphType){
        const newparagraphs = [...paragraphs];
        let finalvalue = value;
        if(typeof value === "number"){
            finalvalue = value.toString();
        }
        newparagraphs[index][key] = finalvalue;
        setParagraphs(newparagraphs);
    }
    function deleteParagraph(e:React.MouseEvent<HTMLButtonElement>,index:number){
        if(paragraphs[index].id != ""){
            setDeletedParagraphs([...deletedparagraphs,paragraphs[index]]);
        } 
        const newparagraphs = [...paragraphs];
        newparagraphs.splice(index,1);
        setParagraphs(newparagraphs);
    }
    function obtainParagraphImageFile(e:React.ChangeEvent<HTMLInputElement>,index:number){
        if(e.target.files && e.target.files.length){
            const newparagraphs = [...paragraphs];
            newparagraphs[index].image = e.target.files[0];
            newparagraphs[index].imagename = e.target.files[0].name;
            setParagraphs(newparagraphs);
       }
    }
    function handleParagraphInstagraphPostLink(e:React.ChangeEvent<HTMLInputElement>,index:number){
        updateParagraph(index,e.target.value,"instagrampostlink");
    }
    return(
        <>
            <form onSubmit={handleSubmit(submitFormData)} className="flex flex-col bg-white dark:bg-[#191C20] gap-y-5">
                <div className="h-fit mt-12">
                    <BlogFormControl 
                        register={register}
                        validationrules={{required:"Blog title is required"}}
                        name="blogtitle"
                        onChange={()=>clearErrors("blogtitle")}
                        aria-required="true" type="text" label="Blog Title"
                        errormessage={errors.blogtitle?.message}
                    />
                    <BlogFormControl 
                        register={register}
                        validationrules={{required:"Author name is required"}}
                        name="authorname"
                        onChange={()=>clearErrors("authorname")}
                        aria-required="true" type="text" label="Author Name"
                        errormessage={errors.authorname?.message}
                    />
                    <BlogFormControl 
                        register={register}
                        validationrules={{required:"Blog date is required"}}
                        onChange={()=>clearErrors("datewritten")}
                        name="datewritten"
                        aria-required="true" type="date" label="Blog date"
                        errormessage={errors.datewritten?.message}
                    />
                    <div className="h-fit my-4">
                        <input 
                            {...register("blogimage")}
                            id="blog-image" className="w-0 h-0 peer overflow-hidden"
                            onChange={(e)=>{ObtainBlogImageFile(e)}}
                            type="file" aria-required="true"
                            accept="image/*" name="blogimage"
                        />
                        <label htmlFor="blog-image" className="
                            cursor-pointer inline-flex border dark:peer-focus:ring-white
                            border-slate-400/60 shadow-sm peer-focus:ring-black
                            dark:border-blue-200/20 w-fit peer-focus:ring-2
                            px-4 py-2 gap-x-3 rounded-[8px] mb-[6px]
                            dark:text-slate-200 text-slate-500"
                        >
                            <BsFolderPlus size={25} />
                            <span>Select blog image</span>
                        </label>
                        {( errors.blogimage?.message != undefined) && <Error message={errors.blogimage?.message!} errortype="danger"/>}
                        {blogfilename.length > 0 && <div className="rounded-[5px]  dark:text-white text-slate-600 py-2 gap-x-2 flex items-center"><IoImageOutline  className="dark:text-white text-slate-500" size={25}/>{blogfilename}</div>}
                    </div>
                    {
                        paragraphs.map(({body,id,imagename,instagrampostlink},index)=>(
                             <div key={index} className="duration-500 mb-5 mt-10">                                 
                                <div className="flex justify-between border-b border-b-slate-300 py-2 px-2 mb-4 items-center gap-x-5 w-full">
                                    <h2 className="text-[20px] dark:text-white text-slate-600">New paragraph</h2>
                                    <button 
                                        type="button" onClick={e=>deleteParagraph(e,index)}
                                        className="
                                            hover:scale-[1.03] duration-200 rounded-[5px] 
                                            border border-slate-700 dark:border-slate-200
                                            text-xl flex-col-center h-6 w-6 px-[2px]" 
                                            title="delete paragraph "
                                    >
                                        <AiOutlineMinus className="dark:text-white text-slate-600" size={20}  />
                                    </button>
                                </div>
                                <div className={`w-full pb-4 mt-8`}>
                                    <label className={`text-white`}>Paragraph Instagram Post Link</label>
                                    <input 
                                        value={instagrampostlink}
                                        onChange={e=>handleParagraphInstagraphPostLink(e,index)} 
                                        className="border text-white bg-transparent mb-2 disabled:cursor-not-allowed border-white focus:ring-2 outline-none duration-300 px-4 focus:ring-white rounded-[5px] w-full py-2"
                                        type="text" id="paragraph_instagram_link"
                                    />
                                </div>
                                <div className="h-fit mt-6 mb-5">
                                    <input 
                                        data-index={index}
                                        id={`image-${index}`} className="w-0 h-0 peer"
                                        onChange={e=>obtainParagraphImageFile(e,index)} name="image"
                                        type="file" aria-required="false" accept="image/*" 
                                    />
                                    <label htmlFor={`image-${index}`} className="
                                        cursor-pointer inline-flex border hover:ring-2 hover:ring-slate-600
                                        border-slate-400/60 shadow-sm peer-focus:ring-2 duration-300
                                        dark:border-blue-200/20 w-fit peer-focus:ring-black
                                        px-4 py-2 gap-x-3 rounded-[8px] mb-[6px] dark:peer-focus:ring-white
                                        dark:text-slate-200 text-slate-500 dark:hover:ring-white"
                                    >
                                        <BsFolderPlus size={25} />
                                        <span>Select paragraph image</span>
                                    </label>
                                    {(imagename && imagename.length > 0) && <div className="rounded-[5px] dark:text-white text-slate-600 flex items-center gap-x-2"><IoImageOutline  className="dark:text-white text-slate-500" size={25}/>{imagename}</div>}
                            </div>
                                <div >
                                    <label htmlFor={"paragraphbody"} className="text-slate-500 dark:text-white">paragraph body</label>
                                    <textarea 
                                        value={body}
                                        onChange={e=>handleParagraphBody(e,index)}
                                        name="paragraphbody"
                                        required aria-required="true"
                                        rows={5} id="paragraphbody" className="
                                        py-2 dark:text-slate-200 px-4 
                                        dark:bg-transparent block border
                                        border-slate-300/80 focus:ring-2
                                        focus:ring-black rounded-[5px] mt-2
                                        outline-none w-full mb-8 dark:focus:ring-white"
                                    />    
                                </div>                           
                            </div>
                        ))
                    }
                    <div className="flex justify-center mb-4 sm:justify-between items-center  flex-wrap ">
                        <button type="button" onClick={addParagraph} className="
                            px-5 border border-slate-600 dark:border-white shrink-0 w-full sm:w-auto
                            text-slate-700 dark:text-white rounded-[5px] py-2 mb-4 sm:mb-0
                             before:content-['Add_paragraph'] before:flex-row-center before:text-white
                            relative dark:before:bg-white before:bg-[rgb(30,30,30)] before:absolute
                             before:h-full before:invisible hover:before:visible overflow-hidden before:w-full 
                            before:inset-0 dark:before:text-slate-700
                             "
                        >
                            Add a paragraph
                        </button>
                        <button type="submit" disabled={isSubmitting} onClick={handleSubmit(submitFormData)} className={`
                            px-10 bg-[rgb(40,40,40)] shrink-0 sm:w-auto dark:bg-white
                            text-white rounded-[5px] py-2 w-full sm:mb-0 focus-visible:ring-2
                             dark:text-slate-600 focus-visible:ring-offset-2 hover:scale-[1.01]
                            ${isSubmitting ? 'cursor-not-allowed bg-[rgb(40,40,40)]/30':''}
                            dark:focus-visible:ring-white focus-visible:ring-black`}
                        >
                            {isSubmitting ? <><Loader /> <span>saving blog</span></> : "Save blog"}
                        </button>
                    </div>
                </div>
                <Modal open={showparagraphmodal} onclose={()=>{}}>
                    <div className="max-w-[20rem] w-[90%] bg-white dark:bg-btnprimary">
                        <div className="px-6 py-4">
                            <div className="py-4">
                                <FaCross />
                            </div>
                            <div className="text-slate-600 dark:text-white">
                                Do you want to delete this paragraph
                            </div>
                            <div className="flex justify-between items-center">
                                <button className="py-2 px-3 bg-red-500">delete</button>
                                <button className="border border-red-500 py-2 px-3">cancel</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </form>
        </>
    )
}