export type Language = 'en' | 'zh'

export const LANGUAGE_COOKIE = 'site_lang'
export const DEFAULT_LANGUAGE: Language = 'en'

export function isLanguage(value: string | null | undefined): value is Language {
  return value === 'en' || value === 'zh'
}

export function resolveLanguage(value: string | null | undefined): Language {
  return isLanguage(value) ? value : DEFAULT_LANGUAGE
}

export function pickByLanguage<T>(language: Language, text: { en: T; zh: T }): T {
  return language === 'zh' ? text.zh : text.en
}
