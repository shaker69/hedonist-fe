import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  active?: boolean;
  label: string;
}

export default function Button ({
  active,
  label,
  className,
  ...props
}: Props) {
  const textColorClass = active ? 'secondary' : 'primary';
  const bgColorClass = active ? 'primary' : 'secondary';

  return (
    <button
      className={`py-2 px-4 border rounded-full bg-color-${bgColorClass} text-color-${textColorClass} border-black ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};
