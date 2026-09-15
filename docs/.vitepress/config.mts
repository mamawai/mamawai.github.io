import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'mawai学习笔记',
  description: 'Java 后端学习记录',

  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    // 右侧本页目录 显示到 h3
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '返回顶部',
    notFound: {
      title: '页面不存在',
      quote: '链接可能写错了，或者文章已经挪走了',
      linkLabel: '回到首页',
      linkText: '回到首页'
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
          modal: {
            displayDetails: '显示详情',
            resetButtonTitle: '清空',
            backButtonTitle: '关闭',
            noResultsText: '没有找到相关内容',
            footer: { selectText: '打开', navigateText: '切换', closeText: '关闭' }
          }
        }
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mamawai/mamawai.github.io' }
    ]
  }
})
