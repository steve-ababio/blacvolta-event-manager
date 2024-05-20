"use client"
import React, { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import BlogFormControl, { BlogFormType } from "../blogformcontrol/blogformcontrol";
import { BsFolderPlus } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";
import Error from "@/app/components/error/error";
import { IoImageOutline } from "react-icons/io5";
import { Slide, toast } from "react-toastify";

type ParagraphField ={
    filename:string,
}
type Paragraph = {
    image:File|null
    title:string
    body:string
}
export default function BlogForm(){
    const [paragraphfields,setParagraphFields] = useState<ParagraphField[]>([]);
    const [paragraphs,setParagraphs] = useState<Paragraph[]>([]);
    const [blogfilename,setBlogFileName] = useState("");
 
    const{
        register,
        handleSubmit,
        formState:{isSubmitting,errors,},
        clearErrors
    } = useForm<BlogFormType>({
        mode:"onChange"
    });

    const submitFormData:SubmitHandler<BlogFormType> = async(data)=>{
        const formdata = new FormData();
        formdata.append("blogtitle",data.blogtitle);
        formdata.append("authorname",data.authorname);
        formdata.append("datewritten",data.datewritten);
        formdata.append("blogimage",data.blogimage[0]);

        for(let i = 0;i < paragraphs.length;i++){
            formdata.append("paragraph",JSON.stringify(paragraphs[i]));
            formdata.append(`image-${i}`,paragraphs[i].image!);
        }
        try{
            const response = await fetch("/api/createblog",{method:"POST",body:formdata});
            const {message} = await response.json();
            toast.success(message,{
                transition:Slide
            });
        }catch(error){
            console.log(error)
        }
    }
    function showParagraph(){
        setParagraphFields([...paragraphfields,{filename:""}]);
        setParagraphs([...paragraphs,{title:"",body:"",image:null}]);
    }
    function obtainImageFile(e:React.ChangeEvent<HTMLInputElement>,index:number){
        if(e.target.files && e.target.files.length){
            const newparagraphsfields = [...paragraphfields];
            newparagraphsfields[index].filename = e.target.files[0].name;
            setParagraphFields(newparagraphsfields);
            const newparagraphs = [...paragraphs];
            newparagraphs[index].image = e.target.files[0];
            setParagraphs(newparagraphs);
       }
    }
    function ObtainBlogImageFile(e:React.ChangeEvent<HTMLInputElement>){
        if(e.target.files && e.target.files.length){
            setBlogFileName(e.target.files[0].name);
        }
    }
    function handleParagraphTitle(e:React.ChangeEvent<HTMLInputElement>,index:number){
        updateParagraph(index,e.target.value,"title");
    }
    function handleParagraphBody(e:React.ChangeEvent<HTMLTextAreaElement>,index:number){
        updateParagraph(index,e.target.value,"body");
    }
    function updateParagraph(index:number,value:any,key:keyof Paragraph){
        const newparagraphs = [...paragraphs];
        newparagraphs[index][key] = value;
        setParagraphs(newparagraphs);
    }
    function deleteParagraphRow(e:React.MouseEvent<HTMLButtonElement>,index:number){
        const newparagraphs = [...paragraphfields];
        newparagraphs.splice(index,1);
        setParagraphFields(newparagraphs);
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
                            {...register("blogimage",{
                                required:"Blog image is required"
                            })}
                            id="blog-image" className="w-0 h-0 peer overflow-hidden"
                            onChange={(e)=>{clearErrors("blogimage");ObtainBlogImageFile(e)}}
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
                        paragraphfields.map(({filename},index)=>(
                            <div key={index} className="duration-500 mb-5 mt-10">                                 
                                <div className="flex justify-between border-b border-b-slate-300 py-2 px-2 rounded-[4px] items-center gap-x-5 w-full">
                                    <h2 className="text-[20px] dark:text-white text-slate-600">New paragraph</h2>
                                    <button 
                                        type="button" onClick={e=>deleteParagraphRow(e,index)}
                                        className="
                                            hover:scale-[1.03] duration-200 rounded-[5px] 
                                            border border-slate-700 dark:border-slate-200
                                            text-xl flex-col-center h-6 w-6 px-[2px]" 
                                            title="delete paragraph "
                                    >
                                        <AiOutlineMinus className="dark:text-white text-slate-600" size={20}  />
                                    </button>
                                </div>
                                <div className="h-fit mt-6 mb-5">
                                    <input 
                                        data-index={index}
                                        id={`image-${index}`} className="w-0 h-0 peer"
                                        onChange={e=>obtainImageFile(e,index)} name="image"
                                        type="file" aria-required="false" accept="image/*" 
                                    />
                                    <label htmlFor={`image-${index}`} className="
                                        cursor-pointer inline-flex border
                                        border-slate-400/60 shadow-sm peer-focus:ring-2
                                        dark:border-blue-200/20 w-fit peer-focus:ring-black
                                        px-4 py-2 gap-x-3 rounded-[8px] mb-[6px] dark:peer-focus:ring-white
                                        dark:text-slate-200 text-slate-500"
                                    >
                                        <BsFolderPlus size={25} />
                                        <span>Select paragraph image</span>
                                    </label>
                                    {filename.length > 0 && <div className="rounded-[5px] dark:text-white text-slate-600 flex items-center gap-x-2"><IoImageOutline  className="dark:text-white text-slate-500" size={25}/>{filename}</div>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor={"paragraphtitle"} className="text-slate-500 dark:text-white">paragraph title</label>
                                    <input 
                                        onChange={e=>handleParagraphTitle(e,index)}
                                        name="paragraphtitle"
                                        className={`
                                            border dark:text-slate-200 dark:bg-transparent
                                            mb-2 disabled:cursor-not-allowed border-slate-300/80 
                                            focus:ring-2 outline-none text-slate-600 duration-300 
                                            px-4 focus:ring-black dark:focus:ring-white rounded-[5px] w-full py-2`
                                        }
                                        type="text" id="paragraphtitle"
                                    />
                                </div>
                                <div >
                                <label htmlFor={"paragraphbody"} className="text-slate-500 dark:text-white">paragraph body</label>
                                    <textarea 
                                        onChange={e=>handleParagraphBody(e,index)}
                                        name="paragraphbody"
                                        required aria-required="true"
                                        rows={5} id="paragraphbody" className="
                                        py-2 dark:text-slate-200 px-4 
                                        dark:bg-transparent block border
                                        border-slate-300/80 focus:ring-2
                                        focus:ring-black rounded-[5px]
                                        outline-none w-full mb-8 dark:focus:ring-white"
                                    />    
                                </div>                           
                            </div>
                        ))
                    }
                    <div className="flex justify-center mb-4 sm:justify-between items-center  flex-wrap ">
                        <button type="button" onClick={showParagraph} className="
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
                            {isSubmitting ? "...creating blog": "create blog"}
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}