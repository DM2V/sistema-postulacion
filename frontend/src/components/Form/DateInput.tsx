import React, {useState, ChangeEvent } from "react";
import { DateProps } from "@/types/components/types.t";


const DateInput: React.FC<DateProps> = ({ name, title, onChange }) => {
    const [isFocused, setFocused] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | string>("");
  
    const handleFocus = () => {
      setFocused(true);
    };
  
    const handleBlur = () => {
      setFocused(false);
    };
  
    const borderStyle = isFocused
      ? "border border-primary-color"
      : "border border-tp-body-color";
  
    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newDate = e.target.value;
      setSelectedDate(newDate);
  
      if (onChange) {
        onChange(new Date(newDate));
    }
    };
  
    return (
      <div className="relative mb-3">
        <label className="block text-tp-body-color font-semibold mb-1">
          {title}
        </label>
        <div className={`relative rounded-lg p-2 bg-white ${borderStyle}`}>
          <input
            id={name}
            type="date"
            className="w-full outline-none "
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={selectedDate instanceof Date ? selectedDate.toISOString().split("T")[0] : ""}
            onChange={handleDateChange}
          />
        </div>
      </div>
    );
  };
  
  export default DateInput;