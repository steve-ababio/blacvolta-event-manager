import { IEditorial, IUserEventDetails } from "@/app/constants/constants";
import { useEffect, useState } from "react"

async function fetchItems(url:string){
    const response = await fetch(url);
    const data = await response.json();
    return data;
   
}
export default function useFetch<T extends IUserEventDetails | IEditorial>(url:string){
    const [data,setData] = useState<T[]>([]);
    const [isLoading,setIsLoading] = useState(false);
    useEffect(function(){
        async function getItems(){
            setIsLoading(true);
            try{
                const data = await fetchItems(url);
                setData(data);
            }catch(error){
                console.log(error);
            }finally{
                setIsLoading(false);
            }
        };
        getItems();
    },[]);
    async function fetchLatest(url:string){
        setIsLoading(true);
        try{
            const data = await fetchItems(url);
            setData(data);
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }
    return {data,fetchLatest,isLoading}
}