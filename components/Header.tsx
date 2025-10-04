'use client';

import { motion } from 'framer-motion';
import { Plus, Search, Database } from 'lucide-react';
import TaskBlueImageLogo from './TaskBlueImageLogo';
import { useI18n } from '@/context/I18nContext';

interface HeaderProps {
  onAddTask: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenDataManager: () => void;
}

export default function Header({ onAddTask, searchQuery, onSearchChange, onOpenDataManager }: HeaderProps) {
  const { t, locale, setLocale } = useI18n();
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-sm border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div>
            <TaskBlueImageLogo size="md" showText={true} />
          </div>

          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                suppressHydrationWarning
                placeholder={t('header.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent w-64"
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenDataManager}
              className="btn-secondary flex items-center space-x-2"
            >
              <Database className="h-4 w-4" />
              <span>{t('header.dataManager')}</span>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAddTask}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>{t('header.addTask')}</span>
            </motion.button>

            <div className="ml-2 flex items-center space-x-2">
              <button
                type="button"
                className={`px-2 py-1 text-xs rounded ${locale === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setLocale('en')}
              >
                EN
              </button>
              <button
                type="button"
                className={`px-2 py-1 text-xs rounded ${locale === 'zh-TW' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setLocale('zh-TW')}
              >
                中文
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
