export const fnUrlReplace = (eleLink: string) => {
  if (!eleLink) {
      return;
  }
  if (eleLink && /^#|javasc/.test(eleLink) === false) {
    if (history.replaceState) {
      history.replaceState(null, document.title, eleLink.split('#')[0] + '#');
      location.replace('');
    } else {
      location.replace(eleLink);
    }
  }
};
export const jsonStr = (str: string | {}) => {
  if (typeof str === 'string') {
    try {
      const obj = JSON.parse(str)
      if (typeof obj === 'object' && obj) {
        return obj
      }
      return str
    } catch (e) {
      console.log(`json parse error${e}`)
      return str
    }
  }
  return str
}

// postMessage
export const transferMessage = (message = {}) => {
  if (!window.parent) {
    return
  }
  window.parent.postMessage(JSON.stringify(message), getParentUrl())
}
export function filterXSS(str: string) {
  const REGEXP1 = /&/g
  const REGEXP2 = /</g
  const REGEXP3 = />/g
  const REGEXP4 = /“/g
  const REGEXP5 = /‘/g
  const REGEXP6 = /\//g

  str = str.replace(REGEXP1, '&amp')
  str = str.replace(REGEXP2, '&lt')
  str = str.replace(REGEXP3, '&gt')
  str = str.replace(REGEXP4, '&quot')
  str = str.replace(REGEXP5, '&#x27')
  str = str.replace(REGEXP6, '')
  return str
}

export function parseURL(str: string) {
  const seg = (str || window.location.search).replace('?', '').split('&')
  const ret: any = {}
  for (let i = 0; i < seg.length; i++) {
    if (!seg[i])
      continue

    const s: any = seg[i].split('=')
    ret[s[0]] = s[1]
  }
  return ret
}

export function analysisUrl(url: string) {
  const arr = (url || '').split('?')
  let obj = {}
  if (arr[1])
    obj = parseURL(arr[1])

  return {
    url: arr[0],
    params: obj,
  }
}

export function getAjaxSignInfo() {
  const data = {
    appid: '1006',
    key: '8bq65ETvuW-DF{R',
    os: 'pc',
  }
  return data
  // callback && callback(data);
}

export function isArray(o: any) {
  return Object.prototype.toString.call(o) === '[object Array]'
}

export function isBoolean(o: any) {
  return Object.prototype.toString.call(o) === '[object Boolean]'
}

export function isDate(o: any) {
  return Object.prototype.toString.call(o) === '[object Date]'
}
export function isFunction(o: any) {
  return Object.prototype.toString.call(o) === '[object Function]'
}

export function isString(o: any) {
  return Object.prototype.toString.call(o) === '[object String]'
}

export function isPlainObject(o: any) {
  return Object.prototype.toString.call(o) === '[object Object]'
}

export function inArray(elem: any, arr: any[], i: number) {
  return arr == null ? -1 : arr.indexOf(elem, i)
}

export function hasClass(obj: Element, cls: string) {
  return obj.className.match(new RegExp(`(\\s|^)${cls}(\\s|$)`))
}

export function addClass(obj: Element, cls: string) {
  if (!hasClass(obj, cls))
    obj.className += ` ${cls}`
}

export function removeClass(obj: Element, cls: string) {
  if (hasClass(obj, cls)) {
    const reg = new RegExp(`(\\s|^)${cls}(\\s|$)`)
    obj.className = obj.className.replace(reg, ' ')
  }
}

export function toggleClass(obj: Element, cls: string) {
  if (hasClass(obj, cls))
    removeClass(obj, cls)
  else
    addClass(obj, cls)
}
// 用整数进行小数的四则运算（避免浮点数运算误差）
export function add(arg1: number, arg2: number) {
  /* 加 */
  let int1 = Number.parseInt(arg1.toString().replace('.', ''), 10)
  let int2 = Number.parseInt(arg2.toString().replace('.', ''), 10)
  let dotLength1: number
  let dotLength2: number
  let gapMultiple: number

  try {
    dotLength1 = arg1.toString().split('.')[1].length
  }
  catch (e) {
    dotLength1 = 0
  }
  try {
    dotLength2 = arg2.toString().split('.')[1].length
  }
  catch (e) {
    dotLength2 = 0
  }

  const gap: number = Math.abs(dotLength1 - dotLength2)

  if (gap > 0) {
    gapMultiple = 10 ** gap

    if (dotLength1 < dotLength2)
      int1 = int1 * gapMultiple
    else
      int2 = int2 * gapMultiple
  }

  const multiple: number = 10 ** Math.max(dotLength1, dotLength2)

  return (int1 + int2) / multiple
}
export function sub(arg1: number, arg2: number) {
  /* 减 */
  return add(arg1, -arg2)
}

export function mul(arg1: number, arg2: number) {
  /* 乘 */
  let multiple: number

  try {
    multiple = arg1.toString().split('.')[1].length
  }
  catch (e) {
    multiple = 0
  }
  try {
    multiple = multiple + arg2.toString().split('.')[1].length
  }
  catch (e) {
    // console.log(e)
  }

  return (
    (Number.parseInt(arg1.toString().replace('.', ''), 10)
    * Number.parseInt(arg2.toString().replace('.', ''), 10))
    / 10 ** multiple
  )
}

export function div(arg1: number, arg2: number) {
  /* 除 */
  let dotLength1: number, dotLength2: number

  try {
    dotLength1 = arg1.toString().split('.')[1].length
  }
  catch (e) {
    dotLength1 = 0
  }
  try {
    dotLength2 = arg2.toString().split('.')[1].length
  }
  catch (e) {
    dotLength2 = 0
  }

  return (
    (Number.parseInt(arg1.toString().replace('.', ''), 10)
    / Number.parseInt(arg2.toString().replace('.', ''), 10))
    * 10 ** (dotLength2 - dotLength1)
  )
}
// 科学计数法转换成字符串的数字
export function eToString(number: number | string) {
  number = number.toString(10)

  const regex = /^(\d)(?:\.(\d*))?[eE]([+-]?)(\d+)$/ // 科学计数法
  const regexArr = regex.exec(number)
  let result: string

  if (regexArr === null) {
    return number
  }
  else {
    const dotNumber = regexArr[2] ? regexArr[2] : ''
    const dotLength = dotNumber.length // 小数位数
    const multiple = Number(regexArr[4]) // 10进制位数
    const gap = Math.abs(multiple - dotLength)
    const tempArr = []
    let i: number

    if (regexArr[3] !== '-') {
      /* 大于1 */
      if (multiple >= dotLength) {
        /* 没有小数 */
        for (i = 0; i < gap; i++)
          tempArr.push('0')

        result = regexArr[1] + dotNumber + tempArr.join('')
      }
      else {
        /* 有小数 */
        result = `${regexArr[1] + dotNumber.substr(0, multiple)}.${dotNumber.substr(multiple)}`
      }
    }
    else {
      /* 小于1 */
      if (multiple === 0) {
        result = regexArr[1] + dotNumber
      }
      else {
        for (i = 0; i < multiple - 1; i++)
          tempArr.push('0')

        result = `0.${tempArr.join('')}${regexArr[1]}${dotNumber}`
      }
    }
  }

  return result
}

export function generateMixed(num: number) {
  // 获取随机字符串
  num = num || 6
  const chars = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ]
  let res = ''

  for (let i = 0; i < num; i++) {
    const id = Math.ceil(Math.random() * 35)
    res += chars[id]
  }
  return res
}
/**
 * @param str Clipboard 的所有方法都是异步的，返回 Promise 对象，复制较大数据时不会造成页面卡顿。
 * 但是其支持的浏览器版本较新，且只允许 https 和 localhost 这些安全网络环境可以使用，限制较多。
 * document.execCommand() 限制较少，使用起来相对麻烦。但是 MDN 上提到该 api 已经废弃：
 */
export function copyText(str = '') {
  // 只有在用户事先授予网站或应用对剪切板的访问许可之后，才能使用异步剪切板读写方法。
  // 许可操作必须通过取得权限 Permissions API (en-US) 的 "clipboard-read" 和/或 "clipboard-write" 项获得。
  // if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
  //   // clipboard api 复制
  //   navigator.clipboard.writeText(str);
  // } else {
  const textarea = document.createElement('textarea')
  document.body.appendChild(textarea)
  // 隐藏此输入框
  textarea.style.position = 'fixed'
  textarea.style.left = '-999999em'
  // 赋值
  textarea.value = str
  // 选中
  textarea.select()
  // 复制
  document.execCommand('copy', true)
  // document.execCommand("cut") : 剪切；
  // document.execCommand("paste") : 粘贴。
  // 移除输入框
  document.body.removeChild(textarea)
  // }
}
export function getUrlParam(name: string) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)

  const r = window.location.search.slice(1).match(reg)
  if (r != null)
    return decodeURIComponent(r[2]).split('?')[0]
  return null
}
export function statLog(topic: string, page: string) {
  window.xla
  && window.xla.push({
    type: 'event',
    category: `${topic}`,
    action: `${page}`,
    extdata: {},
  })
}
// 判断两个矩形重叠面积
export function judgeRectCoincidence(box1: Element, box2: Element) {
  const bx = box1?.getBoundingClientRect().x
  const by = box1?.getBoundingClientRect().y
  const bx1 = box1?.getBoundingClientRect().x + box1?.getBoundingClientRect().width
  const by1 = box1?.getBoundingClientRect().y + box1?.getBoundingClientRect().height
  const b2x = box2?.getBoundingClientRect().x
  const b2y = box2?.getBoundingClientRect().y
  const b2x1 = box2?.getBoundingClientRect().x + box2?.getBoundingClientRect().width
  const b2y1 = box2?.getBoundingClientRect().y + box2?.getBoundingClientRect().height
  const w1 = box1?.getBoundingClientRect().width
  const w2 = box2?.getBoundingClientRect().width
  const h1 = box1?.getBoundingClientRect().height
  const h2 = box2?.getBoundingClientRect().height

  const endx = Math.max(bx1, b2x1)
  const startx = Math.min(bx, b2x)

  const width = w1 + w2 - (endx - startx)

  const endy = Math.max(by1, b2y1)
  const starty = Math.min(by, b2y)

  const height = h1 + h2 - (endy - starty)

  if (width > 0 && height > 0) {
    const area = width * height
    const questArea = w1 * h1
    return area / questArea
    // if (area / questArea >= ratio) {
    //   return true;
    // } else {
    //   return false;
    // }
  }
  else {
    // return false;
    return 0
  }
}
export function getCirclePercent(ratio = 0) {
  // 0-25%，即顶边，多边形只需要前三个点，后三个点为第三个点的复制，为正常显示补间动画
  if (ratio >= 0 && ratio <= 25) {
    return `polygon(50% 50%, 0% 0%, ${(ratio / 25) * 100}% 0%, ${(ratio / 25) * 100}% 0%, ${
      (ratio / 25) * 100
    }% 0%, ${(ratio / 25) * 100}% 0%)`
    // 25%-50%，即右边，多边形需要前四个点，后两个点为第四个点的复制，为正常显示补间动画
  }
  else if (ratio > 25 && ratio <= 50) {
    return `polygon(50% 50%, 0% 0%, 100% 0%, 100% ${((ratio - 25) / 25) * 100}%, 100% ${
      ((ratio - 25) / 25) * 100
    }%, 100% ${((ratio - 25) / 25) * 100}%)`
    // 50%-75%，即底边，底边时横坐标为100%到0%，注意坐标反向；多边形需要前五个点，后一个点为第五个点的复制，为正常显示补间动画
  }
  else if (ratio > 50 && ratio <= 75) {
    return `polygon(50% 50%, 0% 0%, 100% 0%, 100% 100%, ${(1 - (ratio - 50) / 25) * 100}% 100%, ${
      (1 - (ratio - 50) / 25) * 100
    }% 100%)`
  }
  // 75%-100%，即左边，左边时纵坐标为100%到0%，注意坐标反向；多边形需要六个点
  return `polygon(50% 50%, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% ${
    (1 - (ratio - 75) / 25) * 100
  }%)`
}

export function clickOutside(ref: HTMLElement, cb: Function) {
  if (!ref)
    return

  function handler(event: any) {
    if (ref && !ref.contains(event.target))
      cb()
  }
  window.addEventListener('mousedown', handler)
}

function getParentUrl() {
  let url = ''
  const { parent = undefined } = window
  if (parent !== window && !!parent) {
    try {
      url = parent.location.href
    }
    catch (e) {
      url = document.referrer
    }
  }
  return url
}
// 子向父postMessage传递数据
export function postFatherMessage(message = {}) {
  if (!window.parent)
    return

  window.parent.postMessage(JSON.stringify(message), getParentUrl())
}
export function avatarErrorDefaultImg(event: any) {
  const img = event.srcElement
  img.src = 'https://static.shakeeplay.com/bbsys/file/png/27823'
  img.onerror = null
}
export const divideWithMaxDecimal = (num1: number, num2: number) => {
  const result = num1 / num2;
  return parseFloat(result.toFixed(3).slice(0, -1));
}
export const formatNum = (num: number, formatThousand = false) => {
  if (num >= 1000000) {
    return divideWithMaxDecimal(num, 1000000) + 'M'
  } else if (num >= 10000) {
    return  divideWithMaxDecimal(num, 1000) + 'K'
  } if (formatThousand && num >= 1000) {
    return  divideWithMaxDecimal(num, 1000) + 'K'
  } else {
    return num
  }
}
export const initVConsole = () => {
  const {public: { BUILD_ENV }} = useRuntimeConfig();
  if(BUILD_ENV === 'production')  return
  return new Promise(resolve => {
    const script = document.createElement('script')
    script.onload = () => {
      if (window.VConsole) {
        // @ts-ignore
        new window.VConsole()
        resolve(null);
      }
    }
    script.src = 'https://cdn.bootcdn.net/ajax/libs/vConsole/3.11.1/vconsole.min.js';
    document.head.appendChild(script)
  });
}
/**
 * 监听页面Page可见性变化;
 * doc: https://developer.mozilla.org/zh-CN/docs/Web/API/Page_Visibility_API
 * @param {func} fn : fn(hidden?) => clearListener, 返回一个清除监听的函数
 */
export function onVisibilityChange(fn: (hidden?: any) => void) {
  let hidden = '';
  let visibilityChange = '';
  if (typeof document.hidden !== 'undefined') {
    hidden = 'hidden';
    visibilityChange = 'visibilitychange';
    // @ts-ignore
  } else if (typeof document['msHidden'] !== 'undefined') {
    hidden = 'msHidden';
    visibilityChange = 'msvisibilitychange';
    // @ts-ignore
  } else if (typeof document['webkitHidden'] !== 'undefined') {
    hidden = 'webkitHidden';
    visibilityChange = 'webkitvisibilitychange';
  }

  function handleVisibilityChange() {
    // @ts-ignore
    fn(document[hidden]);
  }

  document.addEventListener(visibilityChange, handleVisibilityChange, false);

  const un = () => {
    document.removeEventListener(visibilityChange, handleVisibilityChange, false);
  };

  return un;
}
const formatNickname = (str: string | any[], max = 6) => {
  const arr = Array.from(str); // ["非", "拉", "Y", "非", "拉"]
  const len = arr?.length || 0;
  return len > max ? `${arr.slice(0, max).join('')}` : str;
};