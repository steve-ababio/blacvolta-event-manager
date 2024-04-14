
type ErrorType = "danger"|"success"
export default function Error({message,errortype}:{message:string,errortype:ErrorType,}){
    return(
        <>
            <div className={` 
                duration-300 text-[14px] bg-red-400/20 border z-10 text-center
                ${message != "" ? 'opacity-100 scale-100':'opacity-0 scale-0'} 
                ${errortype === 'danger' ?'border-red-500 bg-red-400/20': 'border-green-500 bg-green-400/20'}
                text-slate-600 px-10 rounded-[4px] py-[6px]`
            }>
                {message}
            </div>
        </>
    )
}