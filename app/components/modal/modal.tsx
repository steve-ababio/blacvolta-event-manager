import { useEffect, useRef } from "react"

type ModalProps = {
    open:boolean,
    onclose:()=>void,
    children:React.ReactNode
}
export default function Modal({open,onclose,children}:ModalProps){
    const overlay = useRef(null);
    
    function closeModal(e:React.MouseEvent){
        const overlayelement = e.target;
        if(Object.is(overlayelement,overlay.current)){
            onclose()
        }
    }
    useEffect(function(){
        if(open){
            document.body.classList.add("body-no-scroll");
        }else{
            document.body.classList.remove("body-no-scroll");
        }
    },[open]);
    return(
        <div ref={overlay} onClick={closeModal} className={`z-[110] fixed backdrop-blur-[3px] inset-0 flex justify-center items-center ${open ? 'block bg-black/40 ':'hidden'}`}>
            {children}
        </div>
    )
}