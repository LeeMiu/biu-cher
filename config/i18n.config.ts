import { currentLocales } from './i18n'

export default defineI18nConfig(() => {
  return {
    legacy: false,
    availableLocales: currentLocales.map((l: any) => l.code),
    fallbackLocale: 'en',
    fallbackWarn: true,
    missingWarn: true,
  }
})
