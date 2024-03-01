import React, { useState, ChangeEvent } from 'react';
import { InputPropsFile } from '../../types/components/types.t';

const FileInput: React.FC<InputPropsFile> = ({
    name,
    title,
    placeholder,
    helpMessage,
    errorMessage,
    disabled = false,
    accept,
    showErrorIcon = true,
    onChange,
}) => {
    const [error, setError] = useState(false);
    const [fileName, setFileName] = useState<string>('');

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setError(false);
            if (onChange) {
                onChange(name, file);
            }
        } else {
            setFileName('');
            setError(true);
        }
    };

    const inputBorderColor = error && showErrorIcon
        ? 'border border-red-500'
        : 'border border-tp-body-color';

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
            <input
                id={name}
                name={name}
                type="file"
                className={`rounded-lg p-2 outline-none w-full ${inputBorderColor}`}
                placeholder={placeholder}
                onChange={handleFileChange}
                disabled={disabled}
                accept={accept}
            />
            {helpText}
        </div>
    );
};

export default FileInput;
