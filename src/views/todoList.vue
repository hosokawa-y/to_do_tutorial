<template>
  <h2>Todo一覧！</h2>
  <ul>
    <!-- v-for で配列に要素をマッピングする -->
    <todo-item
      v-for="todo in todoStore.state.todos"
      :key="todo.id"
      :todo="todo"
      @click-title="clickTitle"
      @click-delete="clickDelete"
    >
    </todo-item>
  </ul>
  <router-link to="/new"> 新規作成 </router-link>
</template>

<script lang="ts">
  import { defineComponent, inject } from "vue";
  import { todoKey } from "@/store/todo";
  import TodoItem from "@/components/TodoItem.vue";
  import { useRouter } from "vue-router";

  export default defineComponent({
    components: {
      TodoItem,
    },
    setup() {
      const todoStore = inject(todoKey);
      if (!todoStore) {
        throw new Error("todoStore is not provided");
      }

      const router = useRouter();

      const clickDelete = (id: number) => {
        todoStore.deleteTodo(id);
      };

      const clickTitle = (id: number) => {
        router.push(`/edit/${id}`);
      };

      return {
        todoStore,
        clickDelete,
        clickTitle,
      };
    },
  });
</script>
