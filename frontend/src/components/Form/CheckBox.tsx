import React, { ChangeEvent } from 'react';

interface CheckBoxProps {
  name: string;
  options: string[];
  selectedOptions: string[];
  allowMultiple: boolean;
  onChange: (updatedValue: string[] | { name: string; option: string }) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  name,
  options,
  selectedOptions,
  allowMultiple,
  onChange,
}) => {
  const handleChange = (option: string) => {
    if (allowMultiple) {
      const updatedOptions = selectedOptions.includes(option)
        ? selectedOptions.filter((selected) => selected !== option)
        : [...selectedOptions, option];
      onChange(updatedOptions);
    } else {
      onChange({ name, option });
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((option) => (
        <label key={option} className='flex items-center space-x-2' >
          <input
            id={name}
            type="checkbox"
            checked={selectedOptions.includes(option)}
            onChange={() => handleChange(option)}
            className="w-6 h-6 text-primary-color focus:ring-0"
          />
          <span className="text-tp-heading-color">{option}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckBox;
