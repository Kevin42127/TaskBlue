'use client';

import { motion, AnimatePresence } from 'framer-motion';
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
      title: '清除所有資料',
      message: '確定要清除所有任務資料嗎？此操作無法復原！',
      type: 'danger',
      confirmText: '清除',
      cancelText: '取消',
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
                資料管理
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
                <h3 className="text-sm font-medium text-gray-700 mb-2">儲存資訊</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>任務數量: {storageInfo.taskCount} 個</p>
                  {storageInfo.lastSaved && (
                    <p>最後儲存: {new Date(storageInfo.lastSaved).toLocaleString('zh-TW')}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    資料自動儲存在瀏覽器的本地儲存中
                  </p>
                </div>
              </div>

              {/* 匯出功能 */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">匯出資料</h3>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleExport}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  <Download className="h-4 w-4" />
                  <span>匯出為 JSON 檔案</span>
                </motion.button>
                <p className="text-xs text-gray-500 mt-2">
                  將所有任務資料匯出為 JSON 格式的備份檔案
                </p>
              </div>

              {/* 匯入功能 */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">匯入資料</h3>
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
                  <span>{isImporting ? '匯入中...' : '從 JSON 檔案匯入'}</span>
                </motion.button>
                <p className="text-xs text-gray-500 mt-2">
                  從備份檔案匯入任務資料（會覆蓋現有資料）
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
                <h3 className="text-sm font-medium text-gray-700 mb-3">清除資料</h3>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClearData}
                  className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>清除所有任務</span>
                </motion.button>
                <p className="text-xs text-gray-500 mt-2">
                  永久刪除所有任務資料（無法復原）
                </p>
              </div>

              {/* 關閉按鈕 */}
              <div className="pt-4 border-t border-gray-200">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="w-full btn-secondary"
                >
                  關閉
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
