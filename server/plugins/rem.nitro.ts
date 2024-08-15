import script from '@/utils/rem';

export default defineNitroPlugin(nitro => {
  nitro.hooks.hook('render:html', (htmlContext) => {
    htmlContext.head.push(`<script id="ssr-rem-js">(${script.toString()})();</script>`);
  })
})

