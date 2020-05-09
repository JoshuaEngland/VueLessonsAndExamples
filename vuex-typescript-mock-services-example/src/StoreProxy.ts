import { Store } from 'vuex'
import { RootState } from '@/store'

export default class StoreProxy {
    private store: Store<RootState>

    constructor (store: Store<RootState>) {
      this.store = store
    }

    async loadQuotes (amount: number) {
      await this.store.dispatch('loadQuotes', amount)
    }

    get quotes () {
      return this.store.getters.quotes
    }
}
