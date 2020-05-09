import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import { Substitute } from '@fluffy-spoon/substitute'
import { createStore } from '@/store'
import StoreProxy from '@/StoreProxy'
import { InspirationalQuoteService } from '@/services/InspirationalQuoteService'

const localVue = createLocalVue()
localVue.use(Vuex)

function createStoryProxy (inspirationalQuotesService: InspirationalQuoteService) {
  const store = createStore(inspirationalQuotesService)
  const storeProxy = new StoreProxy(store)
  return storeProxy
}

describe('Store', () => {
  it('When initially created, then quotes is empty', async () => {
    const inspirationalQuotesService = Substitute.for<InspirationalQuoteService>()
    const storeProxy = createStoryProxy(inspirationalQuotesService)

    expect(storeProxy.quotes).toHaveLength(0)
  })

  it('When quotes loaded successfully, then quotes can be read', async () => {
    const inspirationalQuotesService = Substitute.for<InspirationalQuoteService>()
    inspirationalQuotesService.loadQuote().resolves('Quote')
    const storeProxy = createStoryProxy(inspirationalQuotesService)

    await storeProxy.loadQuotes(5)

    expect(storeProxy.quotes).toHaveLength(5)
  })

  it('When quote loading fails, then quotes state not altered', async () => {
    const inspirationalQuotesService = Substitute.for<InspirationalQuoteService>()
    inspirationalQuotesService.loadQuote().rejects(new Error())
    const storeProxy = createStoryProxy(inspirationalQuotesService)

    await expect(storeProxy.loadQuotes(5)).rejects.toThrow()

    expect(storeProxy.quotes).toHaveLength(0)
  })

  it('When quote loading partially fails, then quotes state not altered', async () => {
    const quotesToLoad = 5
    let callCount = 0
    const inspirationalQuotesService: InspirationalQuoteService = {
      async loadQuote () {
        ++callCount
        if (callCount < quotesToLoad - 1) {
          return 'Quote'
        } else {
          throw new Error()
        }
      }
    }
    const storeProxy = createStoryProxy(inspirationalQuotesService)

    await expect(storeProxy.loadQuotes(quotesToLoad)).rejects.toThrow()

    expect(storeProxy.quotes).toHaveLength(0)
  })
})
