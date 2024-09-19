import { BlogPostType } from "@/app/blogposts/components/bloglist/bloglist";
import { IEvent } from "@/app/constants/constants"
import { TfiSearch } from "react-icons/tfi";

type TableProp = {
    events:IEvent[],
    blogs:BlogPostType[],
    type:"events" | "blogs"
    setFilteredEvents:React.Dispatch<React.SetStateAction<IEvent[]>>
    setFilteredBlogs:React.Dispatch<React.SetStateAction<BlogPostType[]>>
    placeholder:string
}
export default function TableSearch({type,placeholder,events,blogs,setFilteredBlogs,setFilteredEvents}:Partial<TableProp>){
    function getMatchedItems(e:React.ChangeEvent<HTMLInputElement>){
        const searcheditem = e.target.value.toLowerCase();
        if(type === "events"){
            const filteredevents = events!.filter((event)=>{
                if(event.EventName.toLowerCase().includes(searcheditem) || event.Venue.toLowerCase().includes(searcheditem)){
                    return event;
                }
            });
            setFilteredEvents!(filteredevents);
        }else if(type === "blogs"){
            const filteredblogs = blogs!.filter((blog)=>{
                if(blog.title.toLowerCase().includes(searcheditem)){
                    return blog;
                }
            });
            setFilteredBlogs!(filteredblogs);
        }
        
    }
    return(
        <div className="relative max-w-[11rem]">
            <TfiSearch className="absolute top-[10px] left-[10px] dark:text-slate-100 text-slate-600" size={18}/>
            <input type="text" placeholder={placeholder!}
                className="
                    dark:text-white bg-white text-slate-700 w-full
                    dark:bg-[#1c1c1c] border pl-[35px] focus:outline-4
                    focus:outline-[#1a1a1a] dark:focus:outline-white text-[14px]
                    rounded-[20px] border-[#575757] py-[6px]"
                onChange={getMatchedItems} 
            />
        </div>
    )
}