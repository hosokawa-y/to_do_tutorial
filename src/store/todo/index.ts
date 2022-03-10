import { InjectionKey, reactive, readonly } from 'vue'
import { Todo, TodoState, TodoStore, Params } from '@/store/todo/types'

const mockTodo: Todo[] = [
  {
    id: 1,
    title: 'todo1',
    description: '1つめ',
    status: 'waiting',
    createdAt: new Date('2021-03-03'),
    updatedAt: new Date('2021-03-03'),
  },
  {
    id: 2,
    title: 'todo2',
    description: '2つめ',
    status: 'waiting',
    createdAt: new Date('2021-03-04'),
    updatedAt: new Date('2021-03-04'),
  },
  {
    id: 3,
    title: 'todo3',
    description: '3つめ',
    status: 'waiting',
    createdAt: new Date('2021-03-04'),
    updatedAt: new Date('2021-03-04'),
  },
]

// リアクティブな状態（その値が監視され、変更が検知される状態）を作る
const state = reactive<TodoState>({
  todos: mockTodo,
})

// 新たに作成されたTODOの初期化
const initializeTodo = (todo: Params) => {
  const date = new Date()
  return {
    id: date.getTime(),
    title: todo.title,
    description: todo.description,
    status: todo.status,
    createdAt: date,
    updatedAt: date,
  } as Todo
}

const getTodo = (id: number) => {
  const todo = state.todos.find((todo) => todo.id === id)
  if (!todo) {
    throw new Error(`cannnot find todo by id:${id}`)
  }
  return todo
}

const addTodo = (todo: Params) => {
  state.todos.push(initializeTodo(todo))
}

const updateTodo = (id: number, todo: Todo) => {
  const index = state.todos.findIndex((todo) => todo.id === id)
  if (index === -1){
    throw new Error(`cannnot find todo by id:${id}`)
  }
  state.todos[index] = todo
}

const deleteTodo = (id: number) => {
  state.todos = state.todos.filter((todo) => todo.id !== id)
}

const todoStore: TodoStore = {
  state: readonly(state),
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
}

export default todoStore

// ストアをprovide/injectするために必要なキーを宣言する
// provide:親コンポーネントから子に共通の状態をわたす
// inject:子コンポーネントが親から共通の状態を受け取る
export const todoKey: InjectionKey<TodoStore> = Symbol('todo')