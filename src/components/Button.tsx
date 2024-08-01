import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  active?: boolean;
  label?: React.ReactNode;
}

export default function Button ({
  active,
  label,
  children,
  className,
  ...props
}: Props) {
  return (
    <button
      className={`h-fit ${className}`}
      {...props}
    >
      {label ?? children}
    </button>
  );
};
