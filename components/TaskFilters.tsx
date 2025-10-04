'use client';

import { motion } from 'framer-motion';
import { TaskFilter, TaskSort } from '@/types/task';
import SortSelect from './SortSelect';
import { useI18n } from '@/context/I18nContext';

interface TaskFiltersProps {
  filter: TaskFilter;
  sort: TaskSort;
  onFilterChange: (filter: TaskFilter) => void;
  onSortChange: (sort: TaskSort) => void;
}

const filterOptionsBase: { value: TaskFilter; labelKey: string }[] = [
  { value: 'all', labelKey: 'taskFilters.all' },
  { value: 'pending', labelKey: 'taskFilters.pending' },
  { value: 'completed', labelKey: 'taskFilters.completed' },
];


export default function TaskFilters({ filter, sort, onFilterChange, onSortChange }: TaskFiltersProps) {
  const { t } = useI18n();
  const filterOptions = filterOptionsBase.map(opt => ({ value: opt.value, label: t(opt.labelKey) }));
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <motion.button
              key={option.value}
              whileTap={{ scale: 0.95 }}
              onClick={() => onFilterChange(option.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                filter === option.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </motion.button>
          ))}
        </div>

        <div className="flex items-center space-x-1">
          <label className="text-sm font-medium text-gray-700">{t('taskFilters.sortBy')}</label>
          <SortSelect
            value={sort}
            onChange={onSortChange}
          />
        </div>
      </div>
    </motion.div>
  );
}
