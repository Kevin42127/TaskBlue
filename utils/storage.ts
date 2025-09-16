import { Task } from '@/types/task';

const STORAGE_KEY = 'task-management-data';

export interface StoredData {
  tasks: Task[];
  version: string;
  lastSaved: string;
}

// 將任務資料儲存到 localStorage
export const saveTasksToStorage = (tasks: Task[]): void => {
  try {
    const data: StoredData = {
      tasks,
      version: '1.0.0',
      lastSaved: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('儲存任務資料時發生錯誤:', error);
  }
};

// 從 localStorage 載入任務資料
export const loadTasksFromStorage = (): Task[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const data: StoredData = JSON.parse(stored);
    
    // 將字串日期轉換回 Date 物件
    const tasks = data.tasks.map(task => ({
      ...task,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt),
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
    }));

    return tasks;
  } catch (error) {
    console.error('載入任務資料時發生錯誤:', error);
    return [];
  }
};

// 清除所有儲存的資料
export const clearStoredData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('清除資料時發生錯誤:', error);
  }
};

// 匯出資料為 JSON 檔案
export const exportTasksToFile = (tasks: Task[]): void => {
  try {
    const data: StoredData = {
      tasks,
      version: '1.0.0',
      lastSaved: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tasks-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('匯出資料時發生錯誤:', error);
    throw new Error('匯出失敗');
  }
};

// 從檔案匯入資料
export const importTasksFromFile = (file: File): Promise<Task[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data: StoredData = JSON.parse(content);
        
        // 驗證資料格式
        if (!data.tasks || !Array.isArray(data.tasks)) {
          throw new Error('無效的檔案格式');
        }

        // 將字串日期轉換回 Date 物件
        const tasks = data.tasks.map(task => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
        }));

        resolve(tasks);
      } catch (error) {
        console.error('匯入資料時發生錯誤:', error);
        reject(new Error('檔案格式無效或損壞'));
      }
    };

    reader.onerror = () => {
      reject(new Error('讀取檔案失敗'));
    };

    reader.readAsText(file);
  });
};

// 檢查是否有儲存的資料
export const hasStoredData = (): boolean => {
  return localStorage.getItem(STORAGE_KEY) !== null;
};

// 取得儲存資料的資訊
export const getStorageInfo = (): { lastSaved: string | null; taskCount: number } => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { lastSaved: null, taskCount: 0 };

    const data: StoredData = JSON.parse(stored);
    return {
      lastSaved: data.lastSaved,
      taskCount: data.tasks.length,
    };
  } catch (error) {
    console.error('取得儲存資訊時發生錯誤:', error);
    return { lastSaved: null, taskCount: 0 };
  }
};
