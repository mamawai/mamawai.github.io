<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'

const props = defineProps<{ code: string }>()
const { isDark } = useData()
const el = ref<HTMLElement>()
const error = ref('')
// mermaid.render 要求页面内唯一 id
const id = `mermaid-${Math.random().toString(36).slice(2)}`

async function render() {
  // 只在浏览器里加载 mermaid 构建时不碰它
  const { default: mermaid } = await import('mermaid')
  mermaid.initialize({ startOnLoad: false, theme: isDark.value ? 'dark' : 'default' })
  try {
    const { svg } = await mermaid.render(id, decodeURIComponent(props.code))
    if (el.value) {
      el.value.innerHTML = svg
      // 最多缩到原图 65%（字约 10px）免得手机上看不清 再窄就横向滑动
      const svgEl = el.value.querySelector('svg')
      if (svgEl) svgEl.style.minWidth = `${parseFloat(svgEl.style.maxWidth) * 0.65}px`
    }
    error.value = ''
  } catch (e) {
    // 图写错了直接把报错显示出来 方便改
    error.value = String(e)
  }
}

onMounted(render)
// 切换深浅色 按新主题重画
watch(isDark, render)
</script>

<template>
  <div class="mermaid-diagram">
    <div ref="el" />
    <pre v-if="error" class="mermaid-error">{{ error }}</pre>
  </div>
</template>

<style scoped>
.mermaid-diagram {
  margin: 16px 0;
  overflow-x: auto;
  text-align: center;
}

.mermaid-error {
  text-align: left;
  white-space: pre-wrap;
  color: var(--vp-c-danger-1);
}
</style>
