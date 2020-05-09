<template>
  <div id="app">
    <InspirationalQuotes />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import InspirationalQuotes from './components/InspirationalQuotes.vue'

@Component({
  components: {
    InspirationalQuotes
  }
})
export default class App extends Vue {}
</script>

<style>
</style>
