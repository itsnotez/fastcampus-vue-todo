<template>
  <div class='todo-app'>
    <div class="todo-app__actions">
      <div class="filter">
        <button :class = "{ active: filter === 'all'}"
          @click="changeFilter('all')">모든 항목 ({{ total }})</button>
        <button :class = "{ active: filter === 'active'}"
          @click="changeFilter('active')">해야 할 항목 ({{ activeCount}})</button>
        <button :class = "{ active: filter === 'complete'}"
          @click="changeFilter('complete')">완료된 항목 ({{ completedCount }})</button>
      </div>
    </div>
    <div class="todo-app__list">
      <todo-item v-for="todo in filteredTodos"
      :key="todo.id"
      :todo="todo"
      @update-todo="updateTodo"
      @delete-todo="deleteTodo"></todo-item>

    </div>
    <hr>
    <div class="todo-app_creator">

      <todo-creator @create-todo="createTodo"></todo-creator>
    </div>
  </div>
</template>
<script>
import _cloneDeep from 'lodash/cloneDeep'
import _find from 'lodash/find'
import _assign from 'lodash/assign'
import _findIndex from 'lodash/findIndex'

import lowdb from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import cryptoRandomString from 'crypto-random-string'

import TodoCreator from './TodoCreator'
import TodoItem from './TodoItem'
export default {
  name: 'TodoApp',
  components: {
    TodoCreator,
    TodoItem
  },
  data () {
    return {
      db: null,
      todos: [],
      filter: 'all'
    }
  },
  computed: {
    filteredTodos () {
      switch (this.filter) {
        case 'all':
        default:
          return this.todos
        case 'active':
          return this.todos.filter(todo => !todo.done)
        case 'complete':
          return this.todos.filter(todo => todo.done)
      }
    },
    total () {
      return this.todos.length
    },
    activeCount () {
      return this.todos.filter(todo => !todo.done).length
    },
    completedCount () {
      return this.todos.filter(todo => todo.done).length
    }
  },
  created () {
    this.initDB()
  },
  mounted () {
  },
  methods: {
    initDB () {
      const adapter = new LocalStorage('todo-app') // DB
      this.db = lowdb(adapter)

      const hasTodos = this.db.has('todos').value()
      if (hasTodos) {
        // 참조관계를 제거하고 값만 복사하겠다
        this.todos = _cloneDeep(this.db.getState().todos)
      } else {
        // local db 초기화
        this.db.defaults({
          todos: [] // collection
        }).write()
      }
    },
    createTodo (title) {
      console.log(title)
      const newTodo = {
        id: cryptoRandomString({ length: 10 }),
        title,
        createDate: new Date(),
        updateDate: new Date(),
        done: false

      }
      this.db.get('todos') // lodash
        .push(newTodo) // lodash
        .write()
      this.todos.push(newTodo)
    },
    updateTodo (todo, value) {
      console.log('update todo', todo, value)
      this.db.get('todos')
        .find({ id: todo.id })
        .assign(value)
        .write()
      const foundTodo = _find(this.todos, { id: todo.id })
      //      Object.assign(foundTodo, value)
      _assign(foundTodo, value)
    },
    deleteTodo (todo) {
      console.log('delete todo')
      this.db.get('todos')
        .remove({ id: todo.id })
        .write()
      //      const foundIndex = this.todos.findIndex((element) => element.id === todo.id)
      const foundIndex = _findIndex(this.todos, { id: todo.id })
      console.log(foundIndex)

      this.$delete(this.todos, foundIndex)
    },
    changeFilter (filter) {
      console.log(filter)
      this.filter = filter
    }
  }
}
</script>
<style lang="scss" scoped>
  button.active {
    font-weight: bold
  }
</style>
