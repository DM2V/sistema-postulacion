import { ComboBoxProps, ValueType } from "@/types/components/types.t";
import React, { useState } from "react";
import Select from "react-select";

const ComboBox: React.FC<ComboBoxProps> = ({
  name,
  title,
  defaultOption,
  options,
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(
    defaultOption || "",
  );
  const handleSelect = (
    selectedOption: ValueType<{ label: string; value: string }>,
  ) => {
    if (selectedOption && "value" in selectedOption) {
      setSelectedOption(selectedOption.value);
      if (onChange) {
        onChange(name, selectedOption.value);
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

  return (
    <div className="mb-3">
      <label className="mb-1 block font-semibold text-tp-body-color">
        {title}
      </label>
      <Select
        value={{ label: selectedOption, value: selectedOption }}
        onChange={handleSelect}
        options={options.map((option) => ({ label: option, value: option }))}
        styles={customStyles}
      />
    </div>
  );
};

export default ComboBox;
