import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useCallback, useRef } from 'react';

import { useRouter } from '@app/navigation';
import Button from './Button';
import ContentHolder from './ContentHolder';
import { LayoutSwitcher } from './LayoutSwitcher';
import LocaleSwitcher from './LocaleSwitcher';

import logo from '@public/logo.svg?url';

interface Props {
  withLayoutSwitcher?: boolean;
}

export default function Header({ withLayoutSwitcher = false }: Props) {
  const router = useRouter();
  const translation = useTranslations('common');

  const holdTimeout = useRef<NodeJS.Timeout | null>(null);

  const startHold = useCallback(() => {
    holdTimeout.current = setTimeout(() => {
      const shouldRedirect = confirm(translation('redirectToLoginConfirmMessage'));
      
      shouldRedirect && router.push('/login');
    }, 2000);
  }, [router, translation]);

  const endHold = useCallback(() => {
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current);
      holdTimeout.current = null;
    }
  }, []);

  return (
    <header className="py-4 flex justify-center items-center">
      <ContentHolder className="flex justify-between items-center">
        <Button
          onMouseDown={startHold}
          onMouseUp={endHold}
          onMouseLeave={endHold}
        >
          <Image
            priority
            src={logo}
            alt={translation('logoAlt')}
            draggable="false"
          />
        </Button>

        <section className="flex gap-2 items-center">
          {withLayoutSwitcher && <LayoutSwitcher />}
          <LocaleSwitcher />
        </section>
      </ContentHolder>
    </header>
  );
}
