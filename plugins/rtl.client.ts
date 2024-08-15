import {getCookie} from '@/utils/cookie'

const rtlLngs = ['ar']
export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const language = getCookie('language')
    document.documentElement.setAttribute(
      'dir',
      rtlLngs.includes(language) ? 'rtl' : 'ltr',
    )
    document.documentElement.setAttribute('lang', language)
  }
})
