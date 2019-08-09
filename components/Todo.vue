<template>
  <div id="todo">
    <p>
      <input
        v-model="newItemTitle"
        type="text"
        placeholder="TODOを入力しましょう！!"
        @keyup.enter="addTodo"
      />
    </p>
    <ul>
      <li v-for="item in items" :key="item.id">
        <label :class="{ done: item.isChecked }">
          <input v-if="item" v-model="item.isChecked" type="checkbox" />
          {{ item.title }}
        </label>
      </li>
    </ul>
    <button @click="deleteTodo()">チェック済みの項目を削除する</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newItemTitle: '',
      items: []
    }
  },
  mounted() {
    this.loadTodo()
  },
  methods: {
    addTodo() {
      if (!this.newItemTitle) {
        return
      }
      const date = new Date()
      const now = date.getTime()

      this.items.push({
        id: now,
        title: this.newItemTitle,
        isChecked: false
      })
      this.newItemTitle = ''
      this.saveTodo()
    },
    saveTodo() {
      localStorage.setItem('items', JSON.stringify(this.items))
    },
    deleteTodo() {
      this.items = this.items.filter(function(item) {
        return item.isChecked === false //
      })
      this.saveTodo()
    },
    loadTodo() {
      this.items = JSON.parse(localStorage.getItem('items'))
      if (!this.items) {
        this.items = []
      }
    }
  }
}
</script>

<style>
.done {
  text-decoration: line-through;
}
</style>
