import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import { createStore } from '@/store/'
import { InspirationalQuoteServiceImpl } from './services/impl/InspirationalQuoteServiceImpl'

Vue.config.productionTip = false
Vue.use(Vuex)

const inspirationalQuotesService = new InspirationalQuoteServiceImpl()
const store = createStore(inspirationalQuotesService)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
