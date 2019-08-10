<template>
  <div id="todo">
    <p>
      <input
        v-model="newItemTitle"
        type="text"
        placeholder="TODOを入力しましょう！!"
        @keyup.enter="addTodo"
        @keypress="confirmMessage"
      />
    </p>
    <transition-group name="list-complete" tag="ul">
      <li v-for="item in items" :key="item.id" class="list-complete-item">
        <label :class="{ done: item.isChecked }">
          <input
            v-if="item"
            v-model="item.isChecked"
            type="checkbox"
            @change="updateCheckedCount"
          />
          {{ item.title }}
        </label>
      </li>
    </transition-group>
    <button :disabled="!checkedCount" @click="deleteTodo()">
      チェック済みの項目を削除する
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isItemConfirmed: false,
      checkedCount: 0,
      newItemTitle: '',
      items: []
    }
  },
  mounted() {
    this.loadTodo()
    this.updateCheckedCount()
  },
  methods: {
    addTodo() {
      if (!this.newItemTitle) {
        return
      }
      if (!this.isItemConfirmed) {
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
      this.isItemConfirmed = false

      this.saveTodo()
    },
    saveTodo() {
      localStorage.setItem('items', JSON.stringify(this.items))
    },
    deleteTodo() {
      this.items = this.items.filter(function(item) {
        return item.isChecked === false
      })
      this.saveTodo()
    },
    loadTodo() {
      this.items = JSON.parse(localStorage.getItem('items'))
      if (!this.items) {
        this.items = []
      }
    },
    updateCheckedCount() {
      const checked = this.items.filter(function(item) {
        return item.isChecked === true
      })
      this.checkedCount = checked.length
    },
    confirmMessage() {
      this.isItemConfirmed = true
    }
  }
}
</script>

<style>
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
.done {
  text-decoration: line-through;
}
.list-complete-item {
  transition: all 1s;
}
.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
