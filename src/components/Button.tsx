interface Props {
  label: string;
}

export default function Button ({ label }: Props) {
  const textColorClass = 'primary';

  return (
    <button className={`py-2 px-4 border rounded-full text-color-${textColorClass} border-black`}>{label}</button>
  );
};
