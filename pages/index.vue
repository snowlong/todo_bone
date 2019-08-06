<template>
  <div class="container">
    <div>
      <h1 class="title">
        todo_bone
      </h1>
      <todo />
    </div>
  </div>
</template>

<script>
import Todo from '~/components/Todo.vue'

export default {
  components: {
    Todo
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
