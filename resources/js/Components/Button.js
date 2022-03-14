import React from 'react';

export default function Button({ type = 'submit', className = '', processing, onClick, children }) {
  return (
    <button
      type={type}
      className={
        `group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${processing && "opacity-25"
        } ` + className
      }
      disabled={processing}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
