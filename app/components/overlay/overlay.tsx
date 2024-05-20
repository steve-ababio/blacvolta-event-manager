import React, { useRef } from "react";

type OverlayProps={
    visible:boolean
    setVisible:React.Dispatch<React.SetStateAction<boolean>>
}
const Overlay = ({visible,setVisible}:OverlayProps)=>{
    const ref = useRef<HTMLDivElement>(null);
    function removeOverlay(e:React.MouseEvent){
        if(visible && Object.is(ref.current,e.target)){
            setVisible(false)
        }
    }
    return(
        <div ref={ref} onClick={removeOverlay} className={`
            fixed inset-0 h-screen sm:hidden
            w-screen z-50 ${visible ? 'visible bg-black/40':'invisible'}`}>
        </div>
    )
}

export default Overlay;