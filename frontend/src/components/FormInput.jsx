import React from "react";

const FormInput = ({
  label,
  name,
  type = "text",
  required = false,
  placeholder = "",
  value = "",
  onChange,
  disabled = false,
  error = "",
  className = "",
  autoComplete = "off",
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

      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        className={`p-2 border rounded-lg transition duration-150
        ${
          error
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        }
        ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
        ${className}`}
      />

      {error && (
        <span className="text-xs text-red-500">
          {error}
        </span>
      )}
    </div>
  );
};

export default FormInput;