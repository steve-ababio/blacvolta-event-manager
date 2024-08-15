interface TabItemProps{
    setTab:()=>void,
    listcount:number,
    isactive:boolean,
    label:"Events"|"Editorials"

}
export default function TabItem({setTab,label,listcount,isactive}:TabItemProps){
    return(
        <button onClick={setTab} className={`py-[6px] dark:text-gray-500/60 text-[0.88rem] text-gray-500/40 ${isactive ? 'border-b-2 dark:text-white text-slate-800 dark:border-b-white border-b-slate-600':''}`}>
            <span className={`mr-1 duration-700  ${isactive ? 'dark:text-white text-slate-500':''}`}>{label}</span>
            <span className="text-white text-[0.7rem] bg-slate-600 px-[3px] rounded-[4px]">{listcount}</span>
        </button>
    )
}