"use client"
import { ThemeProvider } from "next-themes";

export default function Themeprovider({children}:{children:React.ReactNode}){
    return(
        <ThemeProvider defaultTheme="system" attribute="class" enableSystem>
            {children}
        </ThemeProvider>
    )
}