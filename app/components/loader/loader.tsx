import { useTheme } from "next-themes";
import { RotatingLines } from "react-loader-spinner";

export function Loader(){
    const {theme} = useTheme();
    return(
        theme === "dark" ? <RotatingLines 
        strokeColor="white"
        strokeWidth="4"
        animationDuration="0.8"
        width="17"
        visible={true}
    />:
    <RotatingLines 
        strokeColor="gray"
        strokeWidth="4"
        animationDuration="0.8"
        width="17"
        visible={true}
    />
    )
}