import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-opacity-75';
  let variantClasses = '';

  switch (variant) {
    case 'primary':
      variantClasses = 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
      break;
    case 'secondary':
      variantClasses = 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-400';
      break;
    case 'danger':
      variantClasses = 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
      break;
    default:
      variantClasses = 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
  }

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;