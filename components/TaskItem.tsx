'use client';

import { motion } from 'framer-motion';
import { Task } from '@/types/task';
import { Check, Edit, Trash2, Calendar, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { enUS, zhTW } from 'date-fns/locale';
import { useI18n } from '@/context/I18nContext';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onEdit, onDelete }: TaskItemProps) {
  const { t, locale } = useI18n();
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityText = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return t('taskItem.priority.high');
      case 'medium':
        return t('taskItem.priority.medium');
      case 'low':
        return t('taskItem.priority.low');
      default:
        return priority;
    }
  };

  const getPriorityIcon = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-3 w-3" />;
      case 'medium':
        return <AlertCircle className="h-3 w-3" />;
      case 'low':
        return <AlertCircle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const isOverdue = task.dueDate && new Date() > task.dueDate && !task.completed;
  const dateFormat = locale === 'en' ? 'MMM dd, yyyy' : 'yyyy年MM月dd日';
  const dateLocale = locale === 'en' ? enUS : zhTW;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`card p-4 mb-3 transition-all duration-200 ${
        task.completed ? 'opacity-75' : ''
      } ${isOverdue ? 'border-red-300 bg-red-50' : ''}`}
    >
      <div className="flex items-start space-x-3">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
            task.completed
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'border-gray-300 hover:border-blue-500'
          }`}
        >
          {task.completed && <Check className="h-4 w-4" />}
        </motion.button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3
                className={`text-lg font-medium ${
                  task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                }`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p
                  className={`mt-1 text-sm ${
                    task.completed ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {task.description}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2 ml-4">
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                  task.priority
                )}`}
              >
                {getPriorityIcon(task.priority)}
                <span className="ml-1">{getPriorityText(task.priority)}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              {task.dueDate && (
                <div className={`flex items-center space-x-1 ${isOverdue ? 'text-red-600' : ''}`}>
                  <Calendar className="h-4 w-4" />
                  <span>{format(task.dueDate, dateFormat, { locale: dateLocale })}</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <span>{t('taskItem.createdOn')}</span>
                <span>{format(task.createdAt, dateFormat, { locale: dateLocale })}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => onEdit(task)}
                className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200"
              >
                <Edit className="h-4 w-4" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(task.id)}
                className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
              >
                <Trash2 className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
