import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import TodoList from '@/views/todoList.vue'
import AddTodo from '@/views/AddTodo.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'TodoList',
    component: TodoList,
  },
  {
    path: '/new',
    name: 'AddTodo',
    component: AddTodo,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router