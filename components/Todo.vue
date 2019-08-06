<template>
  <div id="todo">
    <p>
      <input
        v-model="newItemTitle"
        type="text"
        placeholder="TODOを入力しましょう！"
        @keyup.enter="addTodo"
      />
    </p>
    <ul>
      <li v-for="item in items" :key="item.id">
        <label>
          <input v-model="item.isChecked" type="checkbox" /> {{ item.title }}
        </label>
      </li>
    </ul>
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

      this.items.push({
        title: this.newItemTitle,
        isChecked: false
      })
      this.newItemTitle = ''
      this.saveTodo()
    },
    saveTodo() {
      localStorage.setItem('items', JSON.stringify(this.items))
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

<style></style>
