'use client'

import {
  Button,
  ContentHolder,
  PageLayout,
} from '@app/components';

import ArrowBack from '../../../../../public/icon-arrow-left.svg'
import { useRouter } from '@app/navigation';

export default function MenuItemView() {
  const router = useRouter();

  return (
    <PageLayout
      component="div"
      className='min-h-svh bg-color-secondary text-color-primary'
    >
      <header>
        <ContentHolder>
          <Button onClick={() => router.back()}>
            <ArrowBack width="24" height="24" />
          </Button>
        </ContentHolder>
      </header>
      <main>
        qq
      </main>
    </PageLayout>
  )
}