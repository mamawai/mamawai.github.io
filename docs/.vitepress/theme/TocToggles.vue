<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()
// 主页这种没有右栏的页面 不显示收起右栏的按钮
const hasAside = computed(() => frontmatter.value.aside !== false && frontmatter.value.layout !== 'page')

// 两个开关各自记在浏览器里 下次打开还是这个状态
const hidden = ref({ sidebar: false, aside: false })

function read(key: string) {
  try {
    return localStorage.getItem(`vp-hide-${key}`) === '1'
  } catch {
    return false
  }
}

function apply() {
  const root = document.documentElement
  root.classList.toggle('hide-sidebar', hidden.value.sidebar)
  root.classList.toggle('hide-aside', hidden.value.aside)
}

function toggle(key: 'sidebar' | 'aside') {
  hidden.value[key] = !hidden.value[key]
  try {
    localStorage.setItem(`vp-hide-${key}`, hidden.value[key] ? '1' : '0')
  } catch {}
  apply()
}

onMounted(() => {
  hidden.value = { sidebar: read('sidebar'), aside: read('aside') }
  apply()
})
</script>

<template>
  <div class="toc-toggles">
    <button
      type="button"
      class="toc-toggle sidebar"
      :class="{ off: hidden.sidebar }"
      :title="hidden.sidebar ? '显示左侧目录' : '收起左侧目录'"
      :aria-pressed="hidden.sidebar"
      @click="toggle('sidebar')"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3v18" />
      </svg>
    </button>
    <button
      v-if="hasAside"
      type="button"
      class="toc-toggle aside"
      :class="{ off: hidden.aside }"
      :title="hidden.aside ? '显示本页目录' : '收起本页目录'"
      :aria-pressed="hidden.aside"
      @click="toggle('aside')"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M15 3v18" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.toc-toggles {
  display: flex;
  align-items: center;
}

/* 窄屏本来就没有这两栏 对应的按钮也不出现 */
.toc-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  color: var(--vp-c-text-2);
  transition: color 0.25s, background-color 0.25s;
}

@media (min-width: 60rem) {
  .toc-toggle.sidebar {
    display: flex;
  }
}

@media (min-width: 80rem) {
  .toc-toggle.aside {
    display: flex;
  }
}

.toc-toggle:hover {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-default-soft);
}

/* 已经收起时按钮变淡 一眼能看出当前状态 */
.toc-toggle.off {
  color: var(--vp-c-text-3);
}
</style>
