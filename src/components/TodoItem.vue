<template>
  <div class="card">
    <div>
      <span class="title" @click="clickTitle">{{ todo.title }}</span>
      <!-- :classはv-bind:classのこと。 todo.statusの値がwaitingなら class="status waiting"になる -->
      <span class="status" :class="todo.status">{{ todo.status }}</span>
    </div>
    <div class="body">作成日:{{ formatDate }}</div>
    <hr />
    <div class="action">
      <button @click="clickDelete">削除</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Todo } from "@/store/todo/types";
import { defineComponent, PropType } from "vue";
import { useFormatDate } from "@/composables/use-format-date";

export default defineComponent({
  // propsは親コンポーネントから子コンポーネントに渡されるデータ
  // あるcomponentからこのTodoItem componentが利用されるとき、 <todo-item :todo="todo" />という形でTODOオブジェクトをわたす。
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true,
    },
  },
  // emitsは子コンポーネントから親コンポーネントにデータを受けわたす。
  // 親コンポーネントは <todo-item @clickDelete="clickDelete" /> のように受け取る
  emits: ["clickDelete", "clickTitle"],
  setup(props, { emit }) {
    const clickDelete = () => {
      emit("clickDelete", props.todo.id);
    };

    const clickTitle = () => {
      emit("clickTitle", props.todo.id);
    };

    const formatDate = useFormatDate(props.todo.createdAt);

    return {
      clickDelete,
      clickTitle,
      formatDate,
    };
  },
});
</script>

<style scoped>
.card {
  margin-bottom: 20px;
  border: 1px solid;
  box-shadow: 2px 2px 4px gray;
  width: 250px;
}

.title {
  font-weight: 400;
  font-size: 25px;
  padding: 5px;
}

.status {
  padding: 3px;
}

.waiting {
  background-color: #e53935;
}

.working {
  background-color: #80cbc4;
}

.completed {
  background-color: #42a5f5;
}

.pending {
  background-color: #ffee58;
}

.body {
  margin: 5px;
}

.action {
  margin: 5px;
}
</style>
