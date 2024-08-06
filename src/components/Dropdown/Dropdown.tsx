import { ReactNode, useMemo, useState, useRef, useEffect } from 'react';
import ChevronUpIcon from '@public/icon-chevron-up.svg';
import ChevronDownIcon from '@public/icon-chevron-down.svg';
import Button from '../Button';

interface DropdownOption {
  value: string;
  label: string;
}

interface Props {
  className?: string;
  formatOption?: (option: DropdownOption, handleOptionClick: (value: string) => void) => ReactNode;
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
);

export default function Dropdown({
  className,
  formatOption = defaultOptionFormatter,
  initialSelected,
  options,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const [selectedOption, setSelectedOption] = useState(initialSelected);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (isOpen) {
      const rect = dropdownRef.current?.getBoundingClientRect();
      if (rect) {
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;

        if (spaceBelow < 150 && spaceAbove > spaceBelow) {
          setDirection('up');
        } else {
          setDirection('down');
        }
      }
    }
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left z-[9999] ${className}`}>
      <Button
        onClick={toggleDropdown}
        className="inline-flex w-full leading-4 justify-between items-center px-4 py-2 text-sm font-medium text-color-primary bg-color-secondary rounded-xs shadow-sm hover:bg-gray-50 focus:outline-none"
      >
        {selectedOptionLabel}
        {isOpen ? <ChevronUpIcon width="16" height="16" /> : <ChevronDownIcon width="16" height="16" />}
      </Button>

      {isOpen && (
        <div
          className={`absolute right-0 z-10 mt-1 origin-top-right bg-white rounded-xs shadow-lg ${
            direction === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'
          }`}
        >
          <div className="py-1">
            {options.map((option) => formatOption(option, handleOptionClick))}
          </div>
        </div>
      )}
    </div>
  );
}
