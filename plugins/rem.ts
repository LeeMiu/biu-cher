export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    // 屏幕适应
    (function (win, doc) {
      if (!win.addEventListener) return;
      function setFont() {
        const screen = window.screen;
        const body = document.body.getBoundingClientRect();
        const isFullScreen =
          screen.height === Number(body.height.toFixed(0)) &&
          screen.width === Number(body.width.toFixed(0));
        const screenWidth = document.querySelector("html")!.offsetWidth;
        const screenHeight = document.querySelector("html")!.offsetHeight;
        const baseSize = 16;
        const pageWidth = 375;
        const pageHeight = 712;
        let fontSize = (baseSize * screenWidth) / pageWidth;
        if (isFullScreen) {
          fontSize =
            baseSize *
            Math.min(screenWidth / pageWidth, screenHeight / pageHeight);
        }
        console.log(isFullScreen, fontSize);
        document.querySelector("html")!.style.fontSize = `${fontSize}px`;
      }
      setFont();
      setTimeout(() => {
        setFont();
      }, 300);
      doc.addEventListener("DOMContentLoaded", setFont, false);
      win.addEventListener("resize", setFont, false);
      win.addEventListener("load", setFont, false);
    })(window, document);
  }
});
