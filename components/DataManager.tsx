'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/context/I18nContext';
import { useState, useRef } from 'react';
import { X, Download, Upload, Trash2, Database, AlertCircle } from 'lucide-react';
import { useTasks } from '@/context/TaskContext';
import ConfirmDialog from './ConfirmDialog';
import { useConfirm } from '@/hooks/useConfirm';

interface DataManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DataManager({ isOpen, onClose }: DataManagerProps) {
  const { locale, t } = useI18n();
  const { exportTasks, importTasks, clearAllTasks, hasStoredData, getStorageInfo } = useTasks();
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { confirm, state: confirmState } = useConfirm();

  const storageInfo = getStorageInfo();

  const handleExport = () => {
    try {
      exportTasks();
      onClose();
    } catch (error) {
      console.error('匯出失敗:', error);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportError(null);

    try {
      await importTasks(file);
      onClose();
    } catch (error) {
      setImportError(error instanceof Error ? error.message : '匯入失敗');
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClearData = async () => {
    const confirmed = await confirm({
      title: t('dataManager.clearConfirmTitle'),
      message: t('dataManager.clearConfirmMessage'),
      type: 'danger',
      confirmText: t('common.clear'),
      cancelText: t('common.cancel'),
    });

    if (confirmed) {
      clearAllTasks();
      onClose();
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Database className="h-5 w-5 mr-2" />
                {t('header.dataManager')}
              </h2>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </motion.button>
            </div>

            <div className="p-6 space-y-6">
              {/* 儲存資訊 */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">{t('dataManager.storageInfo')}</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{t('dataManager.taskCount')} {storageInfo.taskCount} {t('common.tasksSuffix')}</p>
                  {storageInfo.lastSaved && (
          <p>{t('dataManager.lastSaved')} {new Date(storageInfo.lastSaved).toLocaleString(locale === 'en' ? 'en-US' : 'zh-TW')}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    {t('dataManager.autoSaveNote')}
                  </p>
                </div>
              </div>

              {/* 匯出功能 */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">{t('dataManager.exportTitle')}</h3>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleExport}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  <Download className="h-4 w-4" />
                  <span>{t('dataManager.exportJson')}</span>
                </motion.button>
                <p className="text-xs text-gray-500 mt-2">
                  {t('dataManager.exportDescription')}
                </p>
              </div>

              {/* 匯入功能 */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">{t('dataManager.importTitle')}</h3>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleFileSelect}
                  disabled={isImporting}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  <Upload className="h-4 w-4" />
                  <span>{isImporting ? t('dataManager.importing') : t('dataManager.importJson')}</span>
                </motion.button>
                <p className="text-xs text-gray-500 mt-2">
                  {t('dataManager.importDescription')}
                </p>
                {importError && (
                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {importError}
                    </div>
                  </div>
                )}
              </div>

              {/* 清除資料 */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">{t('dataManager.clearTitle')}</h3>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClearData}
                  className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>{t('dataManager.clearAllTasks')}</span>
                </motion.button>
                <p className="text-xs text-gray-500 mt-2">
                  {t('dataManager.clearDescription')}
                </p>
              </div>

              {/* 關閉按鈕 */}
              <div className="pt-4 border-t border-gray-200">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="w-full btn-secondary"
                >
                  {t('common.close')}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      
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
    </AnimatePresence>
  );
}
