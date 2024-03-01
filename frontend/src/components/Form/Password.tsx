import React, { useState, ChangeEvent } from "react";
import { EyeIcon } from "@/assets/icons/index";
import { PasswordProps } from "@/types/components/types.t";


const Password: React.FC<PasswordProps> = ({   
    name,
    title,
    helpMessage,
    errorMessage,
    validationFunction,
    onPasswordChange,
    onChange,
 }) => {
  const [isFocused, setFocused] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
    validatePassword();
  };

  const borderStyle = isFocused
    ? "border border-primary-color"
    : error
    ? "border border-red-500"
    : "border border-tp-body-color";

  const inputType = isPasswordVisible ? "text" : "password";

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (onPasswordChange) {
      onPasswordChange(name, newPassword);
    }

    if (onChange) {
      onChange(name, newPassword);
    }
  };

  const validatePassword = () => {
    if (validationFunction) {
      const isValid = validationFunction(password);
      setError(!isValid);
    }
  };

  return (
    <div className="relative mb-3">
      <label className="mb-2 block font-semibold text-tp-body-color">
        {title}
      </label>
      <div className={`relative rounded-lg p-2 ${borderStyle}`}>
        <input
          id={name}
          name={name}
          type={inputType}
          className="w-full pr-10 outline-none"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handlePasswordChange}
        />
        <div className="absolute bottom-2 right-2">
          <div  className="h-5 w-6 cursor-pointer text-primary-color">
          <EyeIcon
            onClick={togglePasswordVisibility}
            passwordVisible={isPasswordVisible}
          />
          </div>
        </div>
      </div>
      {error ? (
        <div className="text-red-500">{errorMessage}</div>
      ) : (
        isFocused &&
        isPasswordVisible && <div className="text-blue-500">{helpMessage}</div>
      )}
    </div>
  );
};

export default Password;