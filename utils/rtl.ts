
const script = () => {
  const rtlLngs = ['ar'];
  const language = navigator.language.toLowerCase().slice(0, 2) || 'en';
  document.documentElement.setAttribute(
    'dir',
    rtlLngs.includes(language) ? 'rtl' : 'ltr',
  );
  document.documentElement.setAttribute('lang', language);
}

export default script;
