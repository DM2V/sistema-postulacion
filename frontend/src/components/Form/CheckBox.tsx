import React, { useEffect, useState } from 'react';
import { CheckBoxProps } from '@/types/components/types.t';

const CheckBox: React.FC<CheckBoxProps> = ({
  name,
  options,
  defaultOption,
  selectedOptions,
  onChange,
}) => {
  const [isMounted, setIsMounted] = useState<string | string[] | null>(selectedOptions);
  const [internalselectedOptions, setInternalselectedOptions] = useState<string | string[] | null>(selectedOptions);

  const handleChange = (option: string | null) => {
    setInternalselectedOptions(option);
    if (Array.isArray(internalselectedOptions)) {
      onChange(name, option === null ? internalselectedOptions.filter((selectedOption) => selectedOption !== option) : [...internalselectedOptions, option]);
    } else {
      onChange(name, option);
    }
  };


  const numberOfColumns = options.length > 3 ? 2 : 1;

  useEffect(() => {
    if (defaultOption) {
      setInternalselectedOptions(defaultOption);
    }
  }, [defaultOption]);

  return (
    <div className="grid grid-cols-${numberOfColumns} gap-4">
      {options.map((option) => (
        <label key={option} className="flex items-center space-x-2">
          <input
            id={`${name}-${option}`}
            type="checkbox"
            checked={internalselectedOptions === option}
            onChange={() => handleChange(internalselectedOptions === option ? null : option)}
            className="h-6 w-6 text-primary-color focus:ring-0"
          />
          <span className="text-tp-heading-color">{option}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckBox;
