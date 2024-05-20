import { RotatingLines } from "react-loader-spinner"

type DeleteDialogProps={
    closeDeletePrompt:()=>void,
    deleteRecord:()=>void,
    loading:boolean,
    deletetext:string
}
export default function DeleteRecord({loading,deletetext,deleteRecord,closeDeletePrompt}:DeleteDialogProps){
    return(
        <div className="rounded-[5px] blur-0 z-40 dark:bg-darkprimary 
        dark:border-slate-300/20 bg-white shadow-md">
        <div className="flex justify-between p-4 dark:text-white text-slate-600 w-p[90%] max-w-[500px] items-center border-b border-b-slate-300/30">
            <h2 className="text-[20px]">Confirm Deletion</h2>
            <button onClick={closeDeletePrompt}>close</button>
        </div>
        <div className="p-4 border-b border-b-slate-300/30">
            <p>Are you sure you want to delete this record? </p>
        </div>
        <div className="p-4 flex justify-end gap-1">
            <button onClick={closeDeletePrompt} className="px-[0.75rem] py-[0.375rem] text-white rounded-[4px] bg-[#6C757D]">cancel</button>
            <button onClick={deleteRecord} className="px-[0.75rem] text[14px] py-[0.375rem] flex justify-center items-center text-white rounded-[4px] bg-[#DC3545]">
                {
                    loading? 
                    <>
                        <RotatingLines 
                            strokeColor="white" 
                            strokeWidth="4"
                            animationDuration="0.8"
                            width="20"
                            visible={true} 
                        />
                        <span className="text-[14px]"> deleting</span>
                    </>
                    :<span className="text-[14px]">{deletetext}</span>
                }
            </button>
        </div>
    </div>
    )
}