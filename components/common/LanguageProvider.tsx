'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { LANGUAGE_COOKIE, Language, isLanguage } from '@/lib/i18n'

type LanguageContextType = {
  language: Language
  setLanguage: (nextLanguage: Language) => void
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

type LanguageProviderProps = {
  children: React.ReactNode
  initialLanguage: Language
}

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365

export function LanguageProvider({ children, initialLanguage }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(initialLanguage)

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage)
    localStorage.setItem(LANGUAGE_COOKIE, nextLanguage)
    document.cookie = `${LANGUAGE_COOKIE}=${nextLanguage}; path=/; max-age=${ONE_YEAR_IN_SECONDS}; samesite=lax`
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'zh' : 'en')
  }, [language, setLanguage])

  useEffect(() => {
    const storedLanguage = localStorage.getItem(LANGUAGE_COOKIE)
    if (isLanguage(storedLanguage) && storedLanguage !== initialLanguage) {
      setLanguageState(storedLanguage)
      document.cookie = `${LANGUAGE_COOKIE}=${storedLanguage}; path=/; max-age=${ONE_YEAR_IN_SECONDS}; samesite=lax`
    }
  }, [initialLanguage])

  const value = useMemo(() => ({
    language,
    setLanguage,
    toggleLanguage,
  }), [language, setLanguage, toggleLanguage])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used inside a LanguageProvider')
  }
  return context
}
