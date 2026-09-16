// https://vitepress.dev/guide/extending-default-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Mermaid from './Mermaid.vue'
import TocToggles from './TocToggles.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    // 顶栏右侧放两个收起目录的按钮
    'nav-bar-content-after': () => h(TocToggles)
  }),
  enhanceApp({ app }) {
    app.component('Mermaid', Mermaid)
  }
} satisfies Theme
