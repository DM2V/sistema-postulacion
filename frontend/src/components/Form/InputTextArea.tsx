import React, { useState, ChangeEvent } from 'react';
import { InputProps } from '../../types/components/types.t';
import { CircleXmark } from '@/assets/icons';

const InputTextArea: React.FC<InputProps> = ({
  name,
  title,
  placeholder,
  helpMessage,
  errorMessage,
  disabled = false,
  autocomplete,
  validationFunction,
  onChange,
}) => {
  const [isFocused, setFocused] = useState(false);
  const [error, setError] = useState(false);
  const [value, setValue] = useState<string>(''); // Added type annotation for value

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = async () => {
    setFocused(false);
    // Validate when the input is blurred
    if (validationFunction) {
      const isValid = await validationFunction(value);
      setError(!isValid);
    }
  };

  const handleInputChange = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    setError(false);
    if (validationFunction) {
      const isValid: boolean = await validationFunction(inputValue);
      setError(!isValid);
    }
  
    if (onChange) {
      onChange(inputValue);
    }
  };
  

  const inputBorderColor = error
    ? 'border border-red-500'
    : isFocused
    ? 'border border-primary-color'
    : 'border border-tp-body-color';

  const inputContainerStyle: React.CSSProperties = {
    position: 'relative',
  };

  const errorIconStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    display: error ? 'block' : 'none',
  };

  const helpText = error ? (
    <div className="text-red-500">{errorMessage}</div>
  ) : (
    <div className="text-blue-500">{helpMessage}</div>
  );

  return (
    <div className="relative mb-3">
      <label className="block text-tp-body-color font-semibold mb-1">{title}</label>
      <div style={inputContainerStyle}>
        <textarea
          id={name}
          className={`rounded-lg p-2 outline-none w-full ${inputBorderColor}`}
          placeholder={placeholder}
          onFocus={handleFocus}
          disabled={disabled}
          autoComplete={autocomplete}
          onBlur={handleBlur}
          onChange={handleInputChange}
          style={{ textTransform: 'uppercase' }} 
        />
        <div style={errorIconStyle}>
          {/* Replace CircleXmark with your error icon component */}
          <CircleXmark />
        </div>
      </div>
      {helpText}
    </div>
  );
};

export default InputTextArea;
