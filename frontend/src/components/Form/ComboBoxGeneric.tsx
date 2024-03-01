import React, { useState, useEffect } from "react";
import Select from "react-select";
import { ComboBoxGenericProps, Option, ValueType } from "@/types/components/types.t";

const ComboBoxGeneric: React.FC<ComboBoxGenericProps> = ({
  name,
  title,
  defaultOption,
  options,
  onChange,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(
    options.find((op)=>op.value===defaultOption)
  );

  useEffect(() => {
    setIsMounted(true);

    // Set the selected option based on the defaultOption value
    if (defaultOption && !selectedOption) {
      const defaultOptionObject = options.find((op) => op.value === defaultOption);
      if (defaultOptionObject) {
        setSelectedOption(defaultOptionObject);
      }
    }
  }, [defaultOption, options, selectedOption]);

  const handleSelect = (
    selectedOption: ValueType<{ label: string; value: string }>,
  ) => {
    if (selectedOption && "value" in selectedOption) {
      setSelectedOption(selectedOption);
      if (onChange) {
        onChange(name, selectedOption);
      }
    }
  };
  
  const customStyles = {
    control: (styles: any, { isFocused }: any) => ({
      ...styles,
      backgroundColor: "white",
      border: isFocused ? "1px solid #006935" : "1px solid #414750",
      boxShadow:
        "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      borderRadius: "0.5rem",
      "&:hover": {
        border: "1px solid #006935",
      },
    }),
    option: (styles: any, { isFocused, isHovered }: any) => ({
      ...styles,
      border: "none",
      backgroundColor: isHovered ? "#333333" : "white",
      color: isFocused ? "#565E69" : "inherit",
    }),
  };

  return isMounted ? (
    <div className="mb-3">
      <label className="mb-1 block font-semibold text-tp-body-color">
        {title}
      </label>
      <Select
        id={name}
        name={name}
        value={{ label: selectedOption?.label, value: selectedOption?.value }}
        onChange={handleSelect}
        options={options}
        defaultValue={defaultOption ? selectedOption : undefined}
        styles={customStyles}
      />
    </div>
  ) : null;
};

export default ComboBoxGeneric;
