'use client'

import { useViewContext } from '@app/contexts';

import ViewAgendaIcon from '../../../public/icon-view-agenda.svg';
import ViewCozyIcon from '../../../public/icon-view-cozy.svg';
import Button from '../Button';

export default function LayoutSwitcher() {
  const { isGrid, toggleView } = useViewContext();

  const btnClass = 'rounded-full p-2 ${isGrid}';

  return (
    <div className="flex gap-1">
      <Button
        className={`${btnClass} ${isGrid ? 'bg-color-primary' : 'bg-color-secondary'}`}
        onClick={toggleView}
      >
        <ViewAgendaIcon
          className="icon fill-blue-500"
        />
      </Button>
      <Button
        className={`${btnClass} ${isGrid ? 'bg-color-secondary' : 'bg-color-primary'}`}
        onClick={toggleView}
      >
        <ViewCozyIcon
          className="icon fill-blue-500"
        />
      </Button>
    </div>
  );
}
