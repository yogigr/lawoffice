import React from "react";

const FileInput = ({
  label,
  id = "",
  name = "",
  handleChange,
  handleReset,
  multiple = false,
  value,
  image = false,
  info = ""
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          {
            image && (
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            )
          }
          <div className="flex text-sm text-gray-600 justify-center">
            <label
              htmlFor={name}
              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
            >
              <span>{!value ? label : ""}</span>
              <input
                id={id}
                name={name}
                type="file"
                className="sr-only"
                accept={image ? "image/png, image/jpeg" : ""}
                onChange={(e) => handleChange(e)}
                multiple={multiple}
              />
            </label>
            {value && (
              <div className="flex">
                <p className="mr-1">{`${multiple ? value.length : "1"
                  } ${image ? "Photo" : "File"} akan diupload`}</p>{" "}
                |
                <a
                  className="text-primary ml-1 cursor-pointer"
                  onClick={handleReset}
                >
                  Reset
                </a>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500">{info}</p>
        </div>
      </div>
    </div>
  );
};

export default FileInput;