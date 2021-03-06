import type { Options } from "tsup"
import { defineConfig } from "tsup"

const configNormal: Options = {
  entry: ["src/index.ts"],
  clean: true,
  splitting: true,
  treeshake: true,
  dts: true,
  format: ["cjs", "esm", "iife"],
  target: "es2015",
  env: {
    IS_BROWSER: "false"
  }
}
const configBrowser: Options = {
  entry: {
    "index.browser": "src/index.ts"
  },
  dts: false,
  splitting: true,
  treeshake: true,
  format: ["esm"],
  target: "es2015",
  env: {
    NODE_ENV: "production",
    IS_BROWSER: "true"
  },
  noExternal: [
    "@vue/reactivity",
    "@vue/shared",
    "@vue-reactivity/watch",
    "gsap",
    "path-normalize"
  ]
}
const configBrowserMinify: Options = {
  ...configBrowser,
  env: {
    IS_BROWSER: "false"
  },
  entry: {
    "index.browser.min": "src/index.ts"
  },
  minify: true
}

export default defineConfig([configNormal, configBrowser, configBrowserMinify])
