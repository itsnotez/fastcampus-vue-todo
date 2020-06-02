<template>
  <div
    :class=" {done: todo.done}"
    class="todo-item">
    <div v-if="isEditMode" class="item__inner item--edit">
      <input ref="titleInput"
      :value="editedTitle" @input="editedTitle = $event.target.value"
      @keypress.enter="editedTodo"
      @keypress.esc="offEditMode"
      type="text" />
      <div class="item__actions">
        <button key="complete" @click="editedTodo">완료</button>
        <button key="cancle" @click="offEditMode">취소</button>
      </div>
    </div>
    <div v-else class="item__inner item--normal">
      <input type="checkbox" v-model="done"/>
      <div class="item__title-wrap">
        <div class="item__title"> {{ todo.title }}</div>
        <div class="item__actions">
          <button key="update"
            @click="onEditMode">수정</button>
          <button key="delete"
            @click="deleteTodo">삭제</button>
        </div>
        <div class="item__date"> {{ date }}</div>
      </div>

    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'

export default {
  name: 'TodoItem',
  props: {
    todo: Object
  },
  computed: {
    done: {
      get () {
        return this.todo.done
      },
      set (done) {
        this.updateTodo({
          done: done
        })
      }
    },
    date () {
      const date = dayjs(this.todo.createDate)
      const isSame = date.isSame(this.todo.updateDate)

      if (isSame) {
        return date.format('YYYY년 MM월 DD일 HH시 mm분')
      } else { return `${date.format('YYYY년 MM월 DD일 HH시 mm분')} (edited)` }
    }
  },
  data () {
    return {
      isEditMode: false,
      editedTitle: ''
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    editedTodo () {
      if (this.todo.title !== this.editedTitle) {
        this.updateTodo({
          title: this.editedTitle,
          updatedDate: new Date()
        })
      }
      this.offEditMode()
    },
    onEditMode () {
      this.isEditMode = true
      this.editedTitle = this.todo.title
      this.$nextTick(() => { // 화면이 렌더링된 후 실행하는 Vue function
        this.$refs.titleInput.focus()
      })
    },
    offEditMode () {
      this.isEditMode = false
    },
    updateTodo (value) {
      this.$emit('update-todo', this.todo, value)
    },
    deleteTodo () {
      this.$emit('delete-todo', this.todo)
    }
  }
}
</script>
<style lang="scss" scoped>
.todo-item {
  margin-bottom: 10px;
  .item__inner {
    display: flex;
  }
  .item__date {
    font-size: 12px;
  }
  &.done {
    .item__title {
      text-decoration: line-through;
    }

  }
}
</style>
