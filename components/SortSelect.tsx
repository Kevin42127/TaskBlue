'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { TaskSort } from '@/types/task';
import { useI18n } from '@/context/I18nContext';

interface SortSelectProps {
  value: TaskSort;
  onChange: (value: TaskSort) => void;
}

const sortOptionsBase = [
  { value: 'createdAt' as TaskSort, labelKey: 'sort.createdAt' },
  { value: 'dueDate' as TaskSort, labelKey: 'sort.dueDate' },
  { value: 'priority' as TaskSort, labelKey: 'sort.priority' },
  { value: 'title' as TaskSort, labelKey: 'sort.title' },
];

export default function SortSelect({ value, onChange }: SortSelectProps) {
  const { t } = useI18n();
  const sortOptions = sortOptionsBase.map(opt => ({ value: opt.value, label: t(opt.labelKey) }));
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = sortOptions.find(option => option.value === value);
  const displayText = selectedOption?.label || t('sort.createdAt');

  const handleOptionClick = (optionValue: TaskSort) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // 點擊外部關閉下拉選單
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={selectRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 text-sm bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent min-w-[120px]"
      >
        <span className="text-gray-700">{displayText}</span>
        <ChevronDown 
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleOptionClick(option.value)}
              className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg ${
                value === option.value ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
