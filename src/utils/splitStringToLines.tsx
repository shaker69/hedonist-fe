interface Options {
  type?: React.ElementType;
  className?: string;
}

export const splitStringToLines = (str: string, options: Options = {}) => {
  const {
    type: Element = 'p',
    className,
  } = options;

  return str.split('\n').map((l, i) => <Element key={i} className={className}>{l}</Element>)
};
