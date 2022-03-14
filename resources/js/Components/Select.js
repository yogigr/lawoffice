import React from "react";

const Select = ({
  options = [],
  id,
  name,
  selected = "",
  label = "",
  className,
  onChange,
  withEmpty = true,
  showLabel = true,
  children = null,
}) => {
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

      <select
        id={id}
        name={name}
        className={`mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${className}`}
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        {withEmpty && <option value="">Pilih {label}</option>}

        {options.map((e) => [
          <option value={e.id} key={e.id}>
            {e.name}
          </option>,
          children &&
            e[children].length > 0 &&
            e[children].map((child) => (
              <option value={child.id} key={child.id}>
                &nbsp; {child.name}
              </option>
            )),
        ])}
      </select>
    </div>
  );
};

export default Select;