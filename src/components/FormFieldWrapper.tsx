import React, { PropsWithChildren } from "react"

interface Props {
  id: string;
  label?: React.ReactNode;
}

export const FormFieldWrapper: React.FC<PropsWithChildren<Props>> = ({ id, children, label, ...rest }) => {
  return (
    <div className="flex gap-4" {...rest}>
      {label && <label className="flex text-base font-semibold mb-4 w-[220px]" htmlFor={id}>{label}</label>}

      <div className="flex-auto flex flex-col gap-3 min-w-[220px]">
        {children}
      </div>
    </div>
  )
}