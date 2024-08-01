import { ReactNode, useMemo, useState } from 'react';

import ChevronUpIcon from '../../../public/icon-chevron-up.svg';
import ChevronDownIcon from '../../../public/icon-chevron-down.svg';

interface Props {
  className?: string;
  formatOption: (option: DropdownOption) => ReactNode;
  initialSelected: any;
  options: DropdownOption[];
}

const defaultOptionFormatter = (option: DropdownOption, handleOptionClick: (value: string) => void) => (
  <button
    key={option.value}
    onClick={() => handleOptionClick(option.value)}
    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
  >
    {option.label}
  </button>
)

export default function Dropdown({
  className,
  formatOption,
  initialSelected,
  options,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialSelected);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const selectedOptionLabel = useMemo(() => {
    return options.find(({ value }) => value === selectedOption)?.label;
  }, [options, selectedOption]);

  return (
    <div className={`relative inline-block text-left z-[9999] ${className}`}>
      <button
        onClick={toggleDropdown}
        className="inline-flex leading-4 justify-between items-center px-4 py-2 text-sm font-medium text-color-primary bg-color-secondary border rounded-xs shadow-sm hover:bg-gray-50 focus:outline-none"
      >
        {selectedOptionLabel}
        {isOpen ? <ChevronUpIcon width="16" height="16" /> : <ChevronDownIcon width="16" height="16" />}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 origin-top-right bg-white border rounded-xs shadow-lg">
          <div className="py-1">
            {options.map((option) => (formatOption || defaultOptionFormatter)(option))}
          </div>
        </div>
      )}
    </div>
  );
};
