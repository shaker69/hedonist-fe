import React, { PropsWithChildren } from "react"

interface Props {
  id: string;
  label?: React.ReactNode;
  labelLg?: boolean;
  sub?: string | React.ReactNode;
}

export const FormFieldWrapper: React.FC<PropsWithChildren<Props>> = ({ id, children, label, labelLg, sub, ...rest }) => {
  return (
    <div className="flex gap-32" {...rest}>
      {label && (
        <label className={`flex flex-col ${labelLg ? 'text-lg' : 'text-base'} font-semibold w-[220px]`} htmlFor={id}>
          {label}
          {sub && <span className="pt-0.5 text-xs font-normal text-gray-400">{sub}</span>}
        </label>
      )}

      <div className="flex-auto flex flex-col gap-[1.125rem] min-w-[220px]">
        {children}
      </div>
    </div>
  )
}