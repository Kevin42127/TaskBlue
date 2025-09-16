'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Task, TaskFormData, TaskFilter, TaskSort } from '@/types/task';
import { 
  saveTasksToStorage, 
  loadTasksFromStorage, 
  exportTasksToFile, 
  importTasksFromFile,
  clearStoredData,
  hasStoredData,
  getStorageInfo
} from '@/utils/storage';

interface TaskState {
  tasks: Task[];
  filter: TaskFilter;
  sort: TaskSort;
  searchQuery: string;
  isLoaded: boolean;
}

type TaskAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'SET_FILTER'; payload: TaskFilter }
  | { type: 'SET_SORT'; payload: TaskSort }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'LOAD_TASKS'; payload: Task[] }
  | { type: 'SET_LOADED'; payload: boolean };

const initialState: TaskState = {
  tasks: [],
  filter: 'all',
  sort: 'createdAt',
  searchQuery: '',
  isLoaded: false,
};

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed, updatedAt: new Date() }
            : task
        ),
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    case 'SET_SORT':
      return {
        ...state,
        sort: action.payload,
      };
    case 'SET_SEARCH':
      return {
        ...state,
        searchQuery: action.payload,
      };
    case 'LOAD_TASKS':
      return {
        ...state,
        tasks: action.payload,
      };
    case 'SET_LOADED':
      return {
        ...state,
        isLoaded: action.payload,
      };
    default:
      return state;
  }
}

interface TaskContextType {
  state: TaskState;
  addTask: (taskData: TaskFormData) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  setFilter: (filter: TaskFilter) => void;
  setSort: (sort: TaskSort) => void;
  setSearchQuery: (query: string) => void;
  getFilteredTasks: () => Task[];
  exportTasks: () => void;
  importTasks: (file: File) => Promise<void>;
  clearAllTasks: () => void;
  hasStoredData: () => boolean;
  getStorageInfo: () => { lastSaved: string | null; taskCount: number };
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // 載入儲存的任務資料
  useEffect(() => {
    const savedTasks = loadTasksFromStorage();
    dispatch({ type: 'LOAD_TASKS', payload: savedTasks });
    dispatch({ type: 'SET_LOADED', payload: true });
  }, []);

  // 當任務變更時自動儲存
  useEffect(() => {
    if (state.isLoaded) {
      saveTasksToStorage(state.tasks);
    }
  }, [state.tasks, state.isLoaded]);

  const addTask = (taskData: TaskFormData) => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...taskData,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  const updateTask = (task: Task) => {
    dispatch({ type: 'UPDATE_TASK', payload: { ...task, updatedAt: new Date() } });
  };

  const deleteTask = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const toggleTask = (id: string) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  };

  const setFilter = (filter: TaskFilter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const setSort = (sort: TaskSort) => {
    dispatch({ type: 'SET_SORT', payload: sort });
  };

  const setSearchQuery = (query: string) => {
    dispatch({ type: 'SET_SEARCH', payload: query });
  };

  const getFilteredTasks = (): Task[] => {
    let filteredTasks = state.tasks;

    // Apply search filter
    if (state.searchQuery) {
      filteredTasks = filteredTasks.filter(task =>
        task.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(state.searchQuery.toLowerCase()))
      );
    }

    // Apply status filter
    switch (state.filter) {
      case 'pending':
        filteredTasks = filteredTasks.filter(task => !task.completed);
        break;
      case 'completed':
        filteredTasks = filteredTasks.filter(task => task.completed);
        break;
      default:
        break;
    }

    // Apply sorting
    filteredTasks.sort((a, b) => {
      switch (state.sort) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.getTime() - b.dueDate.getTime();
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'createdAt':
        default:
          return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });

    return filteredTasks;
  };

  const exportTasks = () => {
    exportTasksToFile(state.tasks);
  };

  const importTasks = async (file: File) => {
    try {
      const importedTasks = await importTasksFromFile(file);
      dispatch({ type: 'LOAD_TASKS', payload: importedTasks });
    } catch (error) {
      throw error;
    }
  };

  const clearAllTasks = () => {
    dispatch({ type: 'LOAD_TASKS', payload: [] });
    clearStoredData();
  };

  const value: TaskContextType = {
    state,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    setFilter,
    setSort,
    setSearchQuery,
    getFilteredTasks,
    exportTasks,
    importTasks,
    clearAllTasks,
    hasStoredData,
    getStorageInfo,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
