import React from "react";

const FormSelect = ({
  label,
  name,
  options = [],
  required = false,
  value = "",
  onChange,
  placeholder = "छान्नुहोस्",
  disabled = false,
  error = "",
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-700 flex items-center"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`p-2 border rounded-lg bg-white transition duration-150
        ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        }
        ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
        `}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option, index) => {
          const item =
            typeof option === "string"
              ? { label: option, value: option }
              : option;

          return (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default FormSelect;