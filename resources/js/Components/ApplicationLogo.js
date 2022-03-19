import React from 'react';

export default function ApplicationLogo({ company, className }) {
  return (
    <img
      className={className}
      src={company ? company.logo : ''}
      alt={company ? company.name : ''}
    />
  );
}
