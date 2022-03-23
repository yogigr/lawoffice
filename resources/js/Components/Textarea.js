import React, { useEffect, useRef } from 'react';

export default function Textarea({
  name,
  value,
  className,
  autoComplete,
  required,
  isFocused,
  handleChange,
  label = "",
  showLabel = true,
  placeholder = "",
}) {
  const textarea = useRef();

  useEffect(() => {
    if (isFocused) {
      textarea.current.focus();
    }
  }, []);

  return (
    <div>
      {showLabel && (
        <label
          htmlFor={label}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <textarea
        name={name}
        value={value}
        rows={3}
        className={
          `mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ` +
          className
        }
        ref={textarea}
        autoComplete={autoComplete}
        required={required}
        onChange={(e) => handleChange(e)}
        placeholder={placeholder}
      />
    </div>
  );
}
