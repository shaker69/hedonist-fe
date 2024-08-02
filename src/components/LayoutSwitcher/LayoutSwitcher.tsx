'use client'

import { useViewContext } from '@app/contexts';

import ViewAgendaIcon from '@public/icon-view-agenda.svg';
import ViewCozyIcon from '@public/icon-view-cozy.svg';
import Button from '../Button';

export default function LayoutSwitcher() {
  const { isGrid, toggleView } = useViewContext();

  const btnClass = 'rounded-full p-[0.44rem] m-[0.125rem]';

  return (
    <div className="flex items-center bg-color-secondary rounded-xs">
      <Button
        className={`${btnClass} ${isGrid ? 'bg-color-secondary' : 'bg-color-primary'}`}
        onClick={toggleView}
      >
        <ViewAgendaIcon
          className={`icon fill-color-${isGrid ? 'primary' : 'secondary'}`}
          height="14"
          width="14"
        />
      </Button>
      <Button
        className={`${btnClass} ${isGrid ? 'bg-color-primary' : 'bg-color-secondary'}`}
        onClick={toggleView}
      >
        <ViewCozyIcon
          className={`icon fill-color-${isGrid ? 'secondary' : 'primary'}`}
          height="14"
          width="14"
        />
      </Button>
    </div>
  );
}
