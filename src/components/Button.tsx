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
      className={`h-fit active:scale-95 ${className ? className : ''}`}
      {...props}
    >
      {label ?? children}
    </button>
  );
};
