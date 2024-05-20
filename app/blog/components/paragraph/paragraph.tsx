import { useRef, useState } from "react";
import { BsFolderPlus } from "react-icons/bs";
import BlogFormControl, { BlogForm } from "../blogformcontrol/blogformcontrol";
import { UseFormRegister } from "react-hook-form";

type ParagraphSectionProps = {
    obtainImageFile:(e:React.ChangeEvent<HTMLInputElement>)=>void
}
const ParagraphSection = ({obtainImageFile}:ParagraphSectionProps)=>{
    const [fileloadedmessage,setFileLoadedMessage] = useState("");


    return (
        <> 
            <div className="h-fit">
                <label htmlFor="image" className="
                    cursor-pointer flex border
                    border-slate-400/60 shadow-sm
                    dark:border-blue-200/20 w-fit 
                    px-4 py-2 gap-x-3 rounded-[8px] mb-[6px]
                    dark:text-slate-200 text-slate-500"
                >
                    <BsFolderPlus size={25} />
                    <span>Select paragraph image</span>
                </label>
                {fileloadedmessage.length > 0 && <div className="rouned-[7px] bg-blue-200/40 text-blue-600 py-2 px-3">{fileloadedmessage}</div>}
                <input 
                    id="image" className="w-0 h-0"
                    onChange={obtainImageFile} type="file"
                    aria-required="true" accept="image/*" required 
                />
            </div>
        </>
    )
}

ParagraphSection.displayName = "ParagraphSection";