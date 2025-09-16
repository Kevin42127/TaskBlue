'use client';

import { motion } from 'framer-motion';
import { TaskFilter, TaskSort } from '@/types/task';
import SortSelect from './SortSelect';

interface TaskFiltersProps {
  filter: TaskFilter;
  sort: TaskSort;
  onFilterChange: (filter: TaskFilter) => void;
  onSortChange: (sort: TaskSort) => void;
}

const filterOptions: { value: TaskFilter; label: string }[] = [
  { value: 'all', label: '全部任務' },
  { value: 'pending', label: '待完成' },
  { value: 'completed', label: '已完成' },
];


export default function TaskFilters({ filter, sort, onFilterChange, onSortChange }: TaskFiltersProps) {
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
          <label className="text-sm font-medium text-gray-700">排序方式：</label>
          <SortSelect
            value={sort}
            onChange={onSortChange}
          />
        </div>
      </div>
    </motion.div>
  );
}
