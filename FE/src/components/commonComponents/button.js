import React from 'react';

const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`max-w-[250px] min-w-[150px] px-6 py-2 mt-4 mb-4 text-lightTheme-lightMainText rounded place-self-center
        ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-lightTheme-darkSeaWave hover:bg-opacity-90'}
        ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
