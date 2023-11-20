import React, { useState } from 'react';
import { CheckBoxProps } from '@/types/components/types.t';

const CheckBox: React.FC<CheckBoxProps> = ({
  name,
  options,
  selectedOptions,
  allowMultipleSelection,
  onChange,
}) => {
  const [internalSelectedOptions, setInternalSelectedOptions] = useState<string[]>(
    allowMultipleSelection && Array.isArray(selectedOptions) ? selectedOptions : [],
  );

  const handleChange = (option: string) => {
    if (allowMultipleSelection) {
      const updatedOptions = internalSelectedOptions.includes(option)
        ? internalSelectedOptions.filter((selected) => selected !== option)
        : [...internalSelectedOptions, option];
      setInternalSelectedOptions(updatedOptions);
      onChange(name, updatedOptions);
    } else {
      setInternalSelectedOptions([option]);
      onChange(name, option);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((option) => (
        <label key={option} className="flex items-center space-x-2">
          <input
            id={`${name}-${option}`}
            type="checkbox"
            checked={internalSelectedOptions.includes(option)}
            onChange={() => handleChange(option)}
            className="h-6 w-6 text-primary-color focus:ring-0"
          />
          <span className="text-tp-heading-color">{option}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckBox;
