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
      <li
        v-for="(item, index) in items"
        :key="item.id"
        class="list-complete-item"
      >
        <label :class="{ done: item.isChecked, hide: item.isEditing }">
          <input
            v-if="item"
            v-model="item.isChecked"
            type="checkbox"
            @change="updateCheckedCount"
          />
          {{ item.title }}
        </label>
        <label :class="{ hide: !item.isEditing }">
          <input
            id=""
            v-model="item.title"
            type="text"
            name=""
            @keyup.enter="editTodo(index)"
            @keypress="confirmMessage"
          />
        </label>
        <div class="edit-button-box" :class="{ hide: item.isEditing }">
          <button :disabled="isItemEditing" @click="showEditMode(index)">
            編集
          </button>
          <button :disabled="isItemEditing">削除</button>
        </div>
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
      isItemEditing: false,
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
        isChecked: false,
        isEditing: false
      })
      this.newItemTitle = ''
      this.isItemConfirmed = false

      this.saveTodo()
    },
    saveTodo() {
      localStorage.setItem('items', JSON.stringify(this.items))
    },
    showEditMode(_index) {
      console.log(_index)
      if (this.isItemEditing) {
        return
      }
      this.items[_index].isEditing = true
      this.isItemEditing = true
      this.isItemConfirmed = false
    },
    editTodo(_index) {
      if (!this.isItemConfirmed) {
        return
      }
      this.items[_index].isEditing = false
      this.isItemEditing = false
      this.saveTodo()
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
.hide {
  display: none !important;
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
.edit-button-box {
  display: inline-block;
}
</style>
