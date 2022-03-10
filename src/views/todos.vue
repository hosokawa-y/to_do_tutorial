<template>
  Todo一覧！
</template>

<script lang="ts">
  import { defineComponent, inject } from 'vue'
  import { todoKey } from '@/store/todo'

  export default defineComponent({
    setup() {
      const todoStore = inject(todoKey)
      if (!todoStore) {
        throw new Error('todoStore is not provided')
      }

      return {
        todoStore,
      }
    },
  })
</script>