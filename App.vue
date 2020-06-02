<template>
  <div>
    <todo-app></todo-app>
  </div>
</template>
<script>
import TodoApp from './components/TodoApp'
export default {
  name: 'App',
  components: {
    TodoApp
  },
  data () {
    return {
      msg: 'Hello Vue?!!'
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
$color: blue;
h1 {
  color: $color;
  display: flex;
}
</style>
