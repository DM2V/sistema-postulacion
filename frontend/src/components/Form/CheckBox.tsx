import React, { useState } from 'react';
import { CheckBoxProps } from '@/types/components/types.t';

const CheckBox: React.FC<CheckBoxProps> = ({
  name,
  options,
  selectedOption,
  onChange,
}) => {
  const [internalSelectedOption, setInternalSelectedOption] = useState<string | null>(selectedOption);

  const handleChange = (option: string | null) => {
    setInternalSelectedOption(option);
    onChange(name, option);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((option) => (
        <label key={option} className="flex items-center space-x-2">
          <input
            id={`${name}-${option}`}
            type="checkbox"
            checked={internalSelectedOption === option}
            onChange={() => handleChange(internalSelectedOption === option ? null : option)}
            className="h-6 w-6 text-primary-color focus:ring-0"
          />
          <span className="text-tp-heading-color">{option}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckBox;
