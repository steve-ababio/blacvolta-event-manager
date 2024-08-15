import { Tab_T } from "@/app/constants/constants";
import TabItem from "../tabitem/tabitem";
import { TbRefresh } from "react-icons/tb";
import { RotatingLines } from "react-loader-spinner";
import { useTheme } from "next-themes";
import { Loader } from "../loader/loader";

interface TabProps{
    setEventsTab:()=>void;
    setEditorialsTab:()=>void;
    tab:Tab_T,
    unapprovedeventscount:number,
    unapprovededitorialscount:number,
    isLoading:boolean,
    fetchLatest:()=>void
}

export default function Tab({setEditorialsTab,isLoading,setEventsTab,tab,fetchLatest,unapprovededitorialscount,unapprovedeventscount}:TabProps){
    const {theme} = useTheme();
    return(
        <div className="flex w-full justify-between pt-2 items-center border-b border-gray-700/40 "> 
            <div className="flex gap-x-4 items-center">
                <TabItem 
                    setTab={setEventsTab} 
                    listcount={unapprovedeventscount} 
                    isactive={tab === "EVENTS"}
                    label="Events"
                />
                <TabItem 
                    setTab={setEditorialsTab} 
                    listcount={unapprovededitorialscount}
                    isactive={tab === "EDITORIALS"}
                    label="Editorials"
                />
            </div>
            <button onClick={fetchLatest} className="h-[25px] w-[25px] rounded-[50%] flex justify-center items-center shadow-md  duration-200 dark:bg-white/40 " title="refresh ">
                    {
                    isLoading ? 
                        <Loader/>
                    :
                    <TbRefresh size={17} className="block pointer-events-none text-slate-600 dark:text-white" />
                }
            </button>
        </div>
    )
}