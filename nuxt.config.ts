// https://nuxt.com/docs/api/configuration/nuxt-config
import legacy from "@vitejs/plugin-legacy";
import { defineNuxtConfig } from "nuxt/config";
import { Mode } from "postcss-rtlcss/options";
import { currentLocales } from "./config/i18n";

const rtlDefaultOptions = {
  mode: Mode.combined,
  ignorePrefixedRules: true,
  ltrPrefix: '[dir="ltr"]',
  rtlPrefix: '[dir="rtl"]',
  bothPrefix: "[dir]",
};
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: true,
  modules: [
    "@vant/nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/eslint",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "@vueuse/nuxt",
  ],
  css: [
    "~/styles/vars.css",
    "~/styles/global.css",
    "~/styles/default-theme.css",
  ],
  // dev模式proxy
  // nitro: {
  //   devProxy: {
  //     '/api': {
  //       target: 'http://xjp-test-luckywheel.shakeeplay.com',
  //       changeOrigin: true,
  //       prependPath: true,
  //     },
  //   },
  // },
  vite: {
    build: {
      target: ["es2015", "chrome52"],
      cssCodeSplit: true,
    },
    plugins: [
      legacy({
        targets: ["chrome 52"],
        renderLegacyChunks: false,
        modernPolyfills: true,
      }),
    ],
  },
  hooks: {
    "build:manifest": (manifest) => {
      // vite polyfills 被错误地加载到最后，所以我们必须将它们移动到对象中的第一个位置。
      // 我们不能完全替换 `manifest`，因为这样我们只是改变了一个局部变量，而不是实际的 manifest
      // 这就是为什么我们必须改变引用的原因。
      // 由于 ES2015 对象字符串属性顺序或多或少是有保证的 - 顺序是按时间顺序排列的
      const polyfillKey = "vite/legacy-polyfills";
      const polyfillEntry = manifest[polyfillKey];
      if (!polyfillEntry) return;

      const oldManifest = { ...manifest };
      delete oldManifest[polyfillKey];

      for (const key in manifest) {
        delete manifest[key];
      }

      manifest[polyfillKey] = polyfillEntry;
      for (const key in oldManifest) {
        manifest[key] = oldManifest[key];
      }
    },
  },
  postcss: {
    plugins: {
      "postcss-rtlcss": {
        ...rtlDefaultOptions,
        // 以下两项为false可以让background:url()不走后置处理导致延迟展示
        safeBothPrefix: false,
        processUrls: false,
        processKeyFrames: true,
        useCalc: false,
      },
      autoprefixer: {
        overrideBrowserslist: ["Android 4.1", "iOS 7.1", "Chrome > 24"],
        grid: true,
      },
      "postcss-pxtorem": {
        rootValue: 16, // 基准值
        unitPrecision: 3, // 转换后保留的小数位数
        propList: ["*"], // 需要转换的属性列表
        exclude: /node_modules/i,
        replace: true, // 替换包含 px 的属性
        // 忽略带有 "van" 字符的类名, 会不会误伤?
        selectorBlackList: ["van"],
        mediaQuery: false, // 允许在媒体查询中转换 px
        minPixelValue: 0, // 设置最小的转换数值
      },
    },
  },

  colorMode: {
    classSuffix: "",
  },

  i18n: {
    locales: currentLocales,
    lazy: true,
    strategy: "no_prefix",
    detectBrowserLanguage: false,
    langDir: "locales",
    defaultLocale: "en",
    vueI18n: "./config/i18n.config.ts",
  },

  app: {
    head: {
      viewport: "width=device-width,initial-scale=1,viewport-fit=cover",
      link: [{ rel: "icon", href: "/favicon.ico", sizes: "any" }],
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, viewport-fit=cover",
        },
        { name: "description", content: "biu-cher nuxt app" },
        {
          name: "theme-color",
          media: "(prefers-color-scheme: light)",
          content: "#ffffff",
        },
        {
          name: "theme-color",
          media: "(prefers-color-scheme: dark)",
          content: "#222222",
        },
      ],
    },
    cdnURL: process.env.NUXT_APP_PATH || "/",
  },

  typescript: {
    shim: false,
    strict: true,
    // typeCheck: true,
    tsConfig: {
      compilerOptions: {
        jsx: "preserve",
        jsxImportSource: "vue",
        module: "ESNext",
      },
      include: ["./**/*.ts", "./**/*.tsx", "./**/*.vue", "./**/*.d.ts"],
      exclude: ["node_modules"],
    },
  },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  runtimeConfig: {
    // 仅在服务器端可用的私有密钥
    apiSecret: "123",
    // 公开的键，也会暴露给客户端
    public: {
      BUILD_ENV: process.env.NUXT_APP_BUILD_ENV,
      appBaseApi: process.env.NUXT_APP_BASE_API,
      appBasegwApi: process.env.NUXT_APP_BASEGW_API,
      appLiveApi: process.env.NUXT_APP_LIVE_API,
      appBizApi: process.env.NUXT_APP_BIZ_API,
      appLuckyWheelApi: process.env.NUXT_APP_LUCKYWHEEL_API,
      appDiceApi: process.env.NUXT_APP_DICE_API,
    },
  },
});
