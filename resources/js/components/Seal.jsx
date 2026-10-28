import React from 'react';

export default function Seal({ size = 72, className = '' }) {
  return (
    <img
      src="/images/seal.svg"
      alt="Barangay Amanoaoac seal"
      width={size}
      height={size}
      className={`seal ${className}`}
      style={{ width: size, height: size }}
    />
  );
}