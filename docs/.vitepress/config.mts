import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'mawai学习笔记',
  description: 'Java 后端学习记录',

  markdown: {
    // ```mermaid 代码块换成 Mermaid 组件画图 其他代码块照旧高亮
    config(md) {
      const fence = md.renderer.rules.fence!
      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        if (token.info.trim() === 'mermaid') {
          // 编码后塞进属性 避免 {{ }} 引号被 Vue 模板吃掉
          return `<Mermaid code="${encodeURIComponent(token.content)}" />`
        }
        return fence(tokens, idx, options, env, self)
      }
    }
  },

  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    nav: [
      { text: 'Java 并发', link: '/java/concurrency/synchronized-lock-upgrade' }
    ],

    sidebar: [
      {
        text: 'Java 并发',
        items: [
          { text: 'synchronized 锁升级与工作流程', link: '/java/concurrency/synchronized-lock-upgrade' },
          { text: 'synchronized 版本演进', link: '/java/concurrency/synchronized-versions' }
        ]
      }
    ],

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
        miniSearch: {
          options: {
            // 汉字按相邻两字切（非公平锁 → 非公 公平 平锁）英文数字按词切
            // 建索引和搜索用同一个函数 函数会原样传到浏览器 不能引用外部变量
            tokenize: (text: string, fieldName?: string) => {
              const tokens: string[] = []
              for (const run of text.match(/\p{Script=Han}+|[^\s\p{P}\p{S}\p{Script=Han}]+/gu) ?? []) {
                if (!/\p{Script=Han}/u.test(run) || run.length === 1) {
                  tokens.push(run)
                  continue
                }
                // 建索引时才有 fieldName 顺带存单字 搜一个字也能命中
                if (fieldName) tokens.push(...run)
                for (let i = 0; i < run.length - 1; i++) tokens.push(run.slice(i, i + 2))
              }
              return tokens
            }
          },
          // 搜索词切出来的片段全部出现才算命中
          searchOptions: { combineWith: 'AND' }
        },
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
