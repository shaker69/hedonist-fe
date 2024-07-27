interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function ContentHolder({ children, className = '' }: Props) {
  return (
    <div className={`${className} flex-auto max-w-7xl`}>
      {children}
    </div>
  );
}
