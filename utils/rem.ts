
const script = () => {
  // 屏幕适应 1rem = 16px (设计稿)
  if (!window.addEventListener) return
  function setFont() {
    const screen = window.screen;
    const body = document.body?.getBoundingClientRect();
    const isFullScreen = body
      ? screen.height === Number(body.height.toFixed(0)) && screen.width === Number(body.width.toFixed(0))
      : false;
    const htmlEl = document.querySelector('html');
    if (!htmlEl) {
      return console.warn('[Rem]: Can not find html Element.');
    }
    let screenWidth = htmlEl.offsetWidth;
    let screenHeight = htmlEl.offsetHeight;
    const baseSize = 16
    const pageWidth = 375
    const pageHeight = 712
    let fontSize = (baseSize * screenWidth) / pageWidth
    if (isFullScreen) {
      fontSize = baseSize * Math.min(screenWidth / pageWidth, screenHeight / pageHeight)
    }
    console.log('===>', 'isFullScreen', isFullScreen, 'fontSize', fontSize);
    htmlEl.style.fontSize = `${fontSize}px`
  }
  setFont()
  setTimeout(() => {
    setFont()
  }, 300)
  document.addEventListener('DOMContentLoaded', setFont, false)
  window.addEventListener('resize', setFont, false)
  window.addEventListener('load', setFont, false)
}

export default script;
