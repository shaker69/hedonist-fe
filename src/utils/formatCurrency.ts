import { NumberFormatOptions } from "next-intl";

export const formatCurrency = (
  formatter: { number: (v: number | bigint, options: string | NumberFormatOptions | undefined) => string },
  value: string | number,
  currency = 'GEL',
) => {
  // if (typeof value === 'string') return `${value} ₾`;

  // return formatter.number(value, { style: 'currency', currency })
  //   .replace('GEL', '₾');

  return `${value} ₾`
};
