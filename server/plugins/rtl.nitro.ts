import script from '@/utils/rtl';

export default defineNitroPlugin(nitro => {
  nitro.hooks.hook('render:html', (htmlContext) => {
    htmlContext.head.push(`<script id="ssr-rtl-js">(${script.toString()})();</script>`);
  })
})

