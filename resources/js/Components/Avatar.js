import React from 'react';

const Avatar = ({ src, alt = "" }) => {
  return (
    <img
      className="inline-block h-10 w-10 rounded-full"
      src={src}
      alt={alt}
    />
  )
}

export default Avatar;