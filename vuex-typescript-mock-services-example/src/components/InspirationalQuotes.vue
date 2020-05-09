<template>
    <div>
        <button @click="refresh">Refresh</button>
        <blockquote v-for="(quote, index) in quotes" :key="index">
            {{ quote }}
        </blockquote>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import StoreProxy from '@/StoreProxy'

export default Vue.extend({
  created () {
    this.refresh()
  },
  methods: {
    refresh () {
      this.$store.dispatch('loadQuotes', 5)
    }
  },
  computed: {
    quotes (): Array<string> {
      return this.store.quotes
    },
    store (): StoreProxy {
      return new StoreProxy(this.$store)
    }
  }
})
</script>

<style>

</style>
