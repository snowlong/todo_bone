<template>
  <div id="app">
    <input v-model="message" type="text" />
    <input v-model="isChecked" type="checkbox" />
    <p>{{ message }} {{ isChecked }}</p>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.message }}
      </li>
    </ul>
    <button @click="$store.commit('increment')">
      {{ $store.state.counter }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'hello',
      isChecked: true,
      items: [
        {
          id: 1,
          message: 'morning'
        },
        {
          id: 2,
          message: 'noon'
        },
        {
          id: 3,
          message: 'evening'
        }
      ],
      counter: 0
    }
  }
}
</script>

<style></style>
