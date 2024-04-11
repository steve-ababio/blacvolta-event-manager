import { useRef } from "react"

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
    return(
        <div ref={overlay} onClick={closeModal} className={`z-10 fixed backdrop-blur-[3px] inset-0 flex justify-center items-center ${open ? 'visible bg-black/40 ':'invisible'}`}>
            {children}
        </div>
    )
}