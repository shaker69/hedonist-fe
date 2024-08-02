import { NumberFormatOptions } from "next-intl";

export const formatCurrency = (
  formatter: { number: (v: number | bigint, options: string | NumberFormatOptions | undefined) => string },
  value: number,
  currency = 'GEL',
) => {
  return formatter.number(value, { style: 'currency', currency })
    .replace('GEL', '₾');
};
