<template>
  <div>
    <button @click='createTodo'>추가</button>
    <input type="text" :value="title" :placeholder="placeholder"
    @input="title = $event.target.value"
    @keypress.enter="createTodo" />
  </div>
</template>
<script>
export default {
  name: 'TodoCreator',
  data () {
    return {
      title: '',
      placeholder: '할 일을 추가하세요'
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    createTodo () {
      console.log(this.title)
      const validatedTitle = this.title && this.title.trim()
      console.log('validatedTitle =', validatedTitle)
      if (!validatedTitle) {
        alert('유효하지 않는 제목입니다.')
        this.title = this.title.trim()
        return
      }
      this.$emit('create-todo', this.title)
      this.title = ''
    }
  }
}
</script>
<style lang="less" scoped>

</style>
