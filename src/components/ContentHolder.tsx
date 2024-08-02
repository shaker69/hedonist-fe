interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function ContentHolder({ children, className = '' }: Props) {
  return (
    <div className={`p-4 flex-auto max-w-7xl ${className}`}>
      {children}
    </div>
  );
}
