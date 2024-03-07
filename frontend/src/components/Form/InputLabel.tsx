import React, { useState, ChangeEvent } from 'react';
import {InputProps} from '../../types/components/types.t';
import { CircleXmark } from '@/assets/icons';

const InputLabel: React.FC<InputProps> = ({
    name,
    title,
    placeholder,
    helpMessage,
    errorMessage,
    disabled = false,
    autocomplete,
    showErrorIcon = true,
    validationFunction,
    defaultValue,
    inputType,
    onChange,
  }) => {
    const [isFocused, setFocused] = useState(false);
    const [error, setError] = useState(false);
    const [value, setValue] = useState<string>(''); 
    const handleFocus = () => {
      setFocused(true);
    };
  
    const handleBlur = () => {
      setFocused(false);
      // Validate when the input is blurred
      if (validationFunction) {
        setError(!validationFunction(value));
      }
    };
  
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value.toUpperCase(); 

      setValue(inputValue);
      setError(false);
      if (validationFunction) {
        setError(!validationFunction(inputValue));
      }
  
      if (onChange) {
        onChange(name, inputValue);
      }
    };
  
    const inputBorderColor = error && showErrorIcon
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
      display: error && showErrorIcon ? 'block' : 'none',
    };
  
    const helpText = error ? (
      <div className="text-red-500">{errorMessage}</div>
    ) : (
      <div className="text-blue-500">{helpMessage}</div>
    );
  
    return (
      <div className="relative mb-3">
        <label htmlFor={name} className="block text-tp-body-color font-semibold mb-1">
          {title}
        </label>
        <div style={inputContainerStyle}>
          <input
            id={name}
            name={name}
            defaultValue={defaultValue}
            type="text"
            className={`rounded-lg p-2 outline-none w-full ${inputBorderColor}`}
            placeholder={placeholder}
            onFocus={handleFocus}
            disabled={disabled}
            autoComplete={autocomplete}
            onBlur={handleBlur}
            onChange={handleInputChange}
            style={{ textTransform: inputType ? 'lowercase' : 'uppercase' }}
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
  
  export default InputLabel;