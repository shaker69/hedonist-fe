import Image from 'next/image';

import ViewAgendaIcon from '../../../public/icon-view-agenda.svg';
import ViewCozyIcon from '../../../public/icon-view-cozy.svg';

export default function LayoutSwitcher() {
  return (
    <div>
      <ViewAgendaIcon
        className="icon fill-blue-500"
      />
      <ViewCozyIcon
        className="icon fill-blue-500"
      />
    </div>
  );
}
