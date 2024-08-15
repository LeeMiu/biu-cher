export const domain = process.client && window.location.hostname.split('.').slice(-2).join('.')

export function setCookie(name: string, value: string | number | boolean, hours: number, root?: string) {
  const d = new Date()
  d.setTime(d.getTime() + 60 * 1000 * hours)
  const setDomain = root === 'root' ? domain : ''
  window.document.cookie = `${name}=${encodeURIComponent(value)}; path=/; domain=${setDomain}; expires=${d.toUTCString()};`
}

export function getCookie(name: string): string {
  const v = window.document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`)
  return v ? decodeURIComponent(v[2]) : ''
}

export function deleteCookie(name: string, root?: string) {
  const d = new Date()
  d.setTime(d.getTime() - 1000)
  const setDomain = root === 'root' ? domain : ''
  window.document.cookie = `${name}=;path=/;domain=${setDomain};expires=${d.toUTCString()}`
}
