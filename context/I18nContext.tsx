'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import en from '@/locales/en.json';
import zh from '@/locales/zh.json';

type Locale = 'en' | 'zh-TW';

type Translations = Record<string, string>;

const dictionaries: Record<Locale, Translations> = {
  en,
  'zh-TW': zh,
};

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    try {
      // Ensure SSR uses English to avoid initial Chinese rendering
      if (typeof window === 'undefined') {
        return 'en';
      }
      const saved = localStorage.getItem('taskblue_locale') as Locale | null;
      if (saved && (saved === 'en' || saved === 'zh-TW')) {
        return saved;
      }
      const navigatorLang = navigator.language;
      return navigatorLang && navigatorLang.startsWith('zh') ? 'zh-TW' : 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('taskblue_locale', locale);
      document.documentElement.lang = locale === 'en' ? 'en' : 'zh-TW';
    } catch {}
  }, [locale]);

  const t = useMemo(() => {
    const dict = dictionaries[locale] || dictionaries['zh-TW'];
    return (key: string) => {
      return dict[key] ?? dictionaries['zh-TW'][key] ?? key;
    };
  }, [locale]);

  const value: I18nContextValue = {
    locale,
    setLocale,
    t,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}