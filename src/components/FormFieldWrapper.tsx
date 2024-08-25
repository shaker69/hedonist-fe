import React, { PropsWithChildren } from "react"

interface Props {
  id: string;
  label?: React.ReactNode;
  labelLg?: boolean;
  sub?: string | React.ReactNode;
  classNames?: {
    wrapper?: string,
    label?: string,
    control?: string,
  }
}

export const FormFieldWrapper: React.FC<PropsWithChildren<Props>> = ({
  id,
  children,
  label,
  labelLg,
  sub,
  classNames,
  ...rest
}) => {
  return (
    <div className={`flex gap-32 ${classNames?.wrapper}`} {...rest}>
      {label && (
        <label className={`flex flex-col ${labelLg ? 'text-lg' : 'text-base'} font-semibold w-[220px] ${classNames?.label}`} htmlFor={id}>
          {label}
          {sub && <span className="pt-0.5 text-xs font-normal text-gray-400">{sub}</span>}
        </label>
      )}

      <div className={`flex-auto flex flex-col gap-[1.125rem] min-w-[220px] ${classNames?.control}`}>
        {children}
      </div>
    </div>
  )
}