import type { LocaleObject } from '@nuxtjs/i18n'

const locales: LocaleObject[] = [
  {
    code: 'zh',
    file: 'zh.json',
    name: '简体中文',
  },
  {
    code: 'en',
    file: 'en.json',
    name: 'English',
  },
  {
    code: 'tw',
    file: 'tw.json',
    name: '繁体中文',
  }
]

function buildLocales() {
  const useLocales = Object.values(locales).reduce((acc, data) => {
    acc.push(data)

    return acc
  }, <LocaleObject[]>[])

  return useLocales.sort((a: LocaleObject, b: LocaleObject) => a.code.localeCompare(b.code))
}

export const currentLocales = buildLocales()
