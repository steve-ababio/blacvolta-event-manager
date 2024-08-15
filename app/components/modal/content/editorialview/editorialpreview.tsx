"use client"
import ViewEventDetailsItem from "@/app/components/viewdetailsinfo/viewdetailsinfo"
import { IEditorial } from "@/app/constants/constants"
import { useState } from "react"
import { RxCaretDown, RxCaretUp } from "react-icons/rx"

type ViewEventDetailsProps = {
    modalopen:boolean
    editorial:IEditorial
    closeModal:()=>void
}
export default function EditorialPreview({editorial,modalopen,closeModal}:ViewEventDetailsProps){
    const [showparagraph,setShowParagraph] = useState(false);

    function showParagraph(){
        setShowParagraph(!showparagraph);
    }
    return(
        <div className={`
            max-w-[35rem] w-[90%] h-[90vh] px-8 pt-8 
            dark:bg-[#191C20] bg-white dark:border 
            dark:border-slate-300/20 rounded 
            overflow-y-auto relative z-[110] duration-[350ms]
            ${modalopen ? 'scale-100':'scale-0'}`
        }>
            <div className="w-full h-[16rem]">
                <img className="rounded-[10px] max-h-full max-w-full" src={editorial?.imagepath} alt="event flyer image" />
            </div>
            <div className="text-[14px] md:text-[16px]">
                <h2 className="font-bold pt-3 text-slate-600 dark:text-slate-200 pb-2 text-[18px] border-b border-[#a2a0a07e]">Editorial details</h2>
                <div className="text-slate-500 mt-4 dark:text-slate-200">
                    <ViewEventDetailsItem title="Editorial title: " eventinfo={editorial?.title} />
                    <ViewEventDetailsItem title="Author: " eventinfo={editorial?.author} />
                    <ViewEventDetailsItem title="Date written: " eventinfo={editorial?.date} />
                    {
                        showparagraph && 
                        <div  className={`h-[250px] mt-4 py-2 border border-[#a1a1a165] overflow-y-auto px-3 duration-500 ${showparagraph ? 'visible scale-y-100 opacity-100':'invisible opacity-0 scale-y-0'}`}>
                            {
                                editorial.paragraph.map(paragraph=>(
                                    <p className="text-[0.80rem]">{paragraph.body}</p>
                                ))
                            }
                        </div>
                    }
                    <button onClick={showParagraph}  className="
                        py-2 px-10 rounded-[20px] mt-4 dark:text-slate-700
                      dark:bg-white text-white bg-[#252526]"
                    >
                        {showparagraph 
                            ? 
                            <span className="flex items-center justify-center gap-x-2">
                                hide paragraphs <RxCaretUp className="text-slate-600" size={15} />
                            </span>
                            :
                            <span className="flex items-center justify-center gap-x-2">
                                view paragraphs <RxCaretDown className="text-slate-600" size={15}/>
                            </span>
                        }
                    </button>
                
                </div>
            </div>
            <div className="w-full flex justify-end mb-5">
                <button className="bg-slate-600 text-white px-6 py-2 rounded-[4px]" onClick={closeModal}>close</button>
            </div>
        </div>
    )
}
