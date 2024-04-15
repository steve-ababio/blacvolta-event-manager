
type SelectProps = {
    selectDayofWeek:(e:React.ChangeEvent<HTMLSelectElement>)=>void;
    selectvalue:string,
}
export default function Select({selectDayofWeek,selectvalue}:SelectProps){
    return (
        <div className="w-full">
            <label id="eventday" className="block mb-[3px]">Event recurring day: </label>
            <select defaultValue={selectvalue} onChange={selectDayofWeek} className="w-full border outline-none border-slate-300/80 focus:ring-2 duration-300 px-4 focus:ring-blue-400 py-2 rounded-[5px]" id="eventday" name="daysoftheweek">
                <option value="0">Sunday</option>
                <option value="1">Monday</option>
                <option value="2" selected>Tuesday</option>
                <option value="3">Wednesday</option>
                <option value="4" selected>Thursday</option>
                <option value="5">Friday</option>
                <option value="6" selected>Saturday</option>
            </select>
        </div>
    )
}