<template>
  <div id="app">
    <input v-model="message" type="text" />
    <input v-model="isChecked" type="checkbox">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'hello',
      isChecked: false,
    }
  }
}
</script>

<style></style>
