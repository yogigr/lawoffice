import React from 'react';

const CircularButton = ({className = '', processing = false, onClick, children}) => {
  return (
    <button
        type="button"
        className={
          `inline-flex 
          items-center p-1 border border-transparent 
          rounded-full shadow-sm
          focus:outline-none focus:ring-2 focus:ring-offset-2 
          ${ processing && "opacity-25"} ` + className
        }
        disabled={processing}
        onClick={onClick}
      >
        {children}
      </button>
  )
}

export default CircularButton;