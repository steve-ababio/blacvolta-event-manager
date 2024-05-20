import { BiInfoCircle } from "react-icons/bi"

type ErrorType = "danger"|"success"
export default function Error({message,errortype}:{message:string,errortype:ErrorType,}){
    return(
        <>
            <div className={` 
                duration-300 text-[14px] z-10 text-center w-fit
                ${message != "" ? 'opacity-100 flex-row-center':'opacity-0 hidden'} 
                ${errortype === 'danger' ?'text-red-500': 'text-green-500'}
                `
            }>
                <BiInfoCircle className={`mr-2 ${errortype === "danger" ? 'text-red-500':'text-green-500'}`} size={20}/>
                {message}
            </div>
        </>
    )
}