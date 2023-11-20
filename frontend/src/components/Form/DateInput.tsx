import React, { useState, ChangeEvent } from "react";
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
      onChange(name, new Date(newDate).toString());
    }
  };

  return (
    <div className="relative mb-3">
      <label className="mb-1 block font-semibold text-tp-body-color">
        {title}
      </label>
      <div className={`relative rounded-lg bg-white p-2 ${borderStyle}`}>
        <input
          id={name}
          type="date"
          className="w-full outline-none "
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={selectedDate as string}

          onChange={handleDateChange}
        />
      </div>
    </div>
  );
};

export default DateInput;
