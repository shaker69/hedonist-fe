import { ElementType, Fragment, ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  className?: string;
  component?: ElementType;
};

export default function PageLayout({
  children,
  className,
  component,
}: Props) {
  const Wrapper = component || Fragment;

  return (
    <Wrapper className={className}>
      {children}
    </Wrapper>
  );
}
