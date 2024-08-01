import Image from 'next/image';
import { CSSProperties } from 'react';

import rune1 from '../../public/runes/1.svg?url';
import rune2 from '../../public/runes/2.svg?url';
import rune3 from '../../public/runes/3.svg?url';
import rune4 from '../../public/runes/4.svg?url';
import rune5 from '../../public/runes/5.svg?url';
import rune6 from '../../public/runes/6.svg?url';

const runes = {
  category: [
    null,
    rune2,
    rune3,
    rune5,
  ],
  'menu-item': [
    rune1,
    null,
    rune4,
    rune6,
  ]
};

const positionMap = new Map([
  [rune1, ['left', -28, 'bottom', -42]],
  [rune2, ['right', -26, 'top', 12]],
  [rune3, ['left', 68, 'top', -20]],
  [rune4, ['right', -4, 'bottom', -56]],
  [rune5, ['left', -32, 'top', -22]],
  [rune6, ['right', 100, 'bottom', -60]],
])

const getPositionStyle = (rune: typeof rune1) => {
  const pos = positionMap.get(rune);

  if (!pos) return undefined;

  const [xDirection, xValue, yDirection, yValue] = pos;

  return {
    [xDirection]: xValue,
    [yDirection]: yValue,
  } as CSSProperties;
}

interface Props {
  index: number,
  anchor: 'category' | 'menu-item',
}

const Rune = ({ index, anchor }: Props) => {
  const src = runes[anchor][index];

  if (!src) return null;

  return (
    <Image
      className={`rune absolute z-0`}
      style={getPositionStyle(src)}
      src={src}
      alt="rune"
    />
  );
};

export default Rune;
