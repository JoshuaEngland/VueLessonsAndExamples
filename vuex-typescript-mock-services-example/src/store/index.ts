import Vuex, { ActionContext } from 'vuex'
import { InspirationalQuoteService } from '@/services/InspirationalQuoteService'

interface State {
  quotes: Array<string>;
}
export type RootState = State

export function createStore (service: InspirationalQuoteService) {
  return new Vuex.Store({
    state: {
      quotes: []
    },
    mutations: {
      REPLACE_QUOTES (state: State, quotes: Array<string>) {
        state.quotes = quotes
      }
    },
    actions: {
      loadQuotes: async (context: ActionContext<State, RootState>, amount: number) => {
        const quotes = []
        for (let i = 0; i < amount; ++i) {
          const quote = await service.loadQuote()
          quotes.push(quote)
        }
        context.commit('REPLACE_QUOTES', quotes)
      }
    },
    getters: {
      quotes (state: State) {
        return state.quotes
      }
    }
  })
}
