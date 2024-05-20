interface ViewEventDetailsItemProps{
    eventinfo:string,
    title:string,
}

export default function ViewEventDetailsItem({eventinfo,title}:ViewEventDetailsItemProps) {
    return(
        <div className="py-[6px]">
            <span className="font-bold">{title} </span>
            <span>{eventinfo}</span>
        </div>
    )
}