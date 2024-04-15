import React from "react";

type SelectProps = {
    selectedvalue:string,
}
 const Select = React.forwardRef<HTMLSelectElement,SelectProps>(({selectedvalue},ref)=>{
    return (
        <div className="w-full">
            <label id="eventday" className="block mb-[3px]">Event recurring day: </label>
            <select ref={ref} defaultValue={selectedvalue} onChange={selectDayofWeek} className="w-full border outline-none border-slate-300/80 focus:ring-2 duration-300 px-4 focus:ring-blue-400 py-2 rounded-[5px]" id="eventday" name="daysoftheweek">
                <option value="0">Sunday</option>
                <option value="1">Monday</option>
                <option value="2">Tuesday</option>
                <option value="3">Wednesday</option>
                <option value="4">Thursday</option>
                <option value="5">Friday</option>
                <option value="6">Saturday</option>
            </select>
        </div>
    )
})

export default Select;
Select.displayName = 'Select';

