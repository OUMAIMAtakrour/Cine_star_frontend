import React from "react";
const Button = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors";

  const variants = {
    default: "bg-white text-gray-900 hover:bg-gray-100",
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-white text-white hover:bg-white/10",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
