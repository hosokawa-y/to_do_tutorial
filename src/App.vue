<template>
  <!-- router経由で呼び出されたcomponentはrouter-viewの領域に反映される -->
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue'
import TodoStore, { todoKey } from '@/store/todo'

export default defineComponent({
  name: 'App',
  setup() {
    provide(todoKey, TodoStore)
  },
})
</script>

