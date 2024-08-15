/**
 * localStorage加入保存时间
 * 调用方法在后面setItem的第三个参数加入时间，单位小时
 *
 */
const keyPre = 'vlive_'
const LocalStorage = {
  // 新建一个LocalStorage对象
  setItem(key: string, value: string | number, time = 1) {
    key = `${keyPre}${key}`
    if (Number.parseInt(`${time}`)) {
      time = new Date().getTime() + time * 60 * 60 * 1000
      localStorage.setItem(`${key}_time`, `${time}`)
    }
    localStorage.setItem(key, JSON.stringify(value))
  },
  getItem(key: string) {
    key = `${keyPre}${key}`
    const time = Number(localStorage.getItem(`${key}_time`)) || 0
    if (!time) {
      return localStorage.getItem(key)
    }
    else {
      const d = new Date().getTime()
      if (d > time) {
        // 过期了
        localStorage.removeItem(key)
        return undefined
      }
      else {
        return localStorage.getItem(key)
      }
    }
  },
  removeItem(key: string) {
    key = `${keyPre}${key}`
    localStorage.removeItem(key)
    localStorage.removeItem(`${key}_time`)
  },
  clear() {
    localStorage.clear()
  },
}

export default LocalStorage
