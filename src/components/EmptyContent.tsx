import { useTranslations } from "next-intl";

interface Props {
  label?: React.ReactNode;
}

export const EmptyContent: React.FC<Props> = ({ label }) => {
  const translation = useTranslations();

  return (
    <div className="flex-auto flex rounded-xl bg-white justify-center items-center">
      <span className="text-[#949494] font-normal text-sm">{label ?? translation('Index.empty')}</span>
    </div>
  )
}