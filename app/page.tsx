'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TaskProvider, useTasks } from '@/context/TaskContext';
import Header from '@/components/Header';
import TaskFilters from '@/components/TaskFilters';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import DataManager from '@/components/DataManager';
import ConfirmDialog from '@/components/ConfirmDialog';
import { useConfirm } from '@/hooks/useConfirm';
import { Task } from '@/types/task';
import TaskBlueImageLogo from '@/components/TaskBlueImageLogo';
import { useI18n } from '@/context/I18nContext';

function TaskManager() {
  const { t } = useI18n();
  const {
    state,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    setFilter,
    setSort,
    setSearchQuery,
    getFilteredTasks,
  } = useTasks();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDataManagerOpen, setIsDataManagerOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const { confirm, state: confirmState } = useConfirm();

  const handleAddTask = () => {
    setEditingTask(undefined);
    setIsFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (taskData: any) => {
    if (editingTask) {
      updateTask({ ...editingTask, ...taskData });
    } else {
      addTask(taskData);
    }
  };

  const handleDeleteTask = async (id: string) => {
    const confirmed = await confirm({
      title: t('confirm.deleteTaskTitle'),
      message: t('confirm.deleteTaskMessage'),
      type: 'danger',
      confirmText: t('common.delete'),
      cancelText: t('common.cancel'),
    });

    if (confirmed) {
      deleteTask(id);
    }
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onAddTask={handleAddTask}
        searchQuery={state.searchQuery}
        onSearchChange={setSearchQuery}
        onOpenDataManager={() => setIsDataManagerOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <TaskBlueImageLogo size="lg" showText={false} />
              <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {t('page.welcomeTitle')}
                </h2>
                <p className="text-gray-600">
                  {t('page.welcomeText')}
                </p>
              </div>
            </div>
          </div>

          <TaskFilters
            filter={state.filter}
            sort={state.sort}
            onFilterChange={setFilter}
            onSortChange={setSort}
          />

          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {state.filter === 'all' && t('page.tasks.all')}
                {state.filter === 'pending' && t('page.tasks.pending')}
                {state.filter === 'completed' && t('page.tasks.completed')}
              </h3>
              <span className="text-sm text-gray-500">
                {filteredTasks.length} {t('common.tasksSuffix')}
              </span>
            </div>
          </div>

          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        </motion.div>
      </main>

      <TaskForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        task={editingTask}
      />

      <DataManager
        isOpen={isDataManagerOpen}
        onClose={() => setIsDataManagerOpen(false)}
      />

      <ConfirmDialog
        isOpen={confirmState.isOpen}
        title={confirmState.title}
        message={confirmState.message}
        type={confirmState.type}
        confirmText={confirmState.confirmText}
        cancelText={confirmState.cancelText}
        onConfirm={confirmState.onConfirm || (() => {})}
        onCancel={confirmState.onCancel || (() => {})}
      />
    </div>
  );
}

export default function Home() {
  return (
    <TaskProvider>
      <TaskManager />
    </TaskProvider>
  );
}
