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
import { computed, defineComponent, PropType, isRef, Ref, ref } from "vue";

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

    // useFormatDate関数はリアクティブな要素とそうでない要素どちらも受け取る
    const useFormatDate = (date: Date | Ref<Date>) => {
      // 受け取った要素がリアクティブかどうかはisRef()で判断する。
      // リアクティブじゃなかったらref()でリアクティブ化してから使用する。ref()は値をオブジェクト化する
      const dateRef = isRef(date) ? date : ref(date)
      // computed関数は、中で利用されているリアクティブな値が更新されたときのみ計算結果が再評価される
      return computed(() => {
        // ref()でリアクティブ化した値にアクセスするにはdeteRef.valueのようにアクセスする
        return `${dateRef.value.getFullYear()}/${
          dateRef.value.getMonth() + 1
        }/${dateRef.value.getDate()}`
      })
    }

    const formatDate = useFormatDate(props.todo.createdAt)

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
