import React from 'react';

export default function Checkbox({ name, value, handleChange }) {
  return (
    <input
      type="checkbox"
      name={name}
      value={value}
      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
      onChange={(e) => handleChange(e)}
    />
  );
}
