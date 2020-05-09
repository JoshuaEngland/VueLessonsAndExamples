import Vuex, { Store } from 'vuex'
import { createLocalVue, WrapperArray, mount } from '@vue/test-utils'

import flushPromises from 'flush-promises'
import Substitute from '@fluffy-spoon/substitute'
import InspirationalQuotes from '@/components/InspirationalQuotes.vue'
import { createStore, RootState } from '@/store'
import { InspirationalQuoteService } from '@/services/InspirationalQuoteService'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('InspirationalQuotes', () => {
  it('When created with default values, then 5 quotes are and displayed', async () => {
    const inspirationalQuotesService = Substitute.for<InspirationalQuoteService>()
    inspirationalQuotesService.loadQuote().resolves('Quote')
    const store: Store<RootState> = createStore(inspirationalQuotesService)

    const wrapper = mount(InspirationalQuotes, {
      localVue,
      store
    })
    await flushPromises()

    expect(wrapper.findAll('blockquote')).toHaveLength(5)
  })

  it('When created with default values, then 5 quotes loaded from the service', async () => {
    const inspirationalQuotesService = Substitute.for<InspirationalQuoteService>()
    inspirationalQuotesService.loadQuote().resolves('Quote')
    const store: Store<RootState> = createStore(inspirationalQuotesService)

    mount(InspirationalQuotes, {
      localVue,
      store
    })
    await flushPromises()

    inspirationalQuotesService.received(5).loadQuote()
  })

  it('When created, then the loaded quotes are included in block quotes', async () => {
    const inspirationalQuotesService = Substitute.for<InspirationalQuoteService>()
    inspirationalQuotesService.loadQuote().resolves('Quote 1', 'Quote 2', 'Quote 3', 'Quote 4', 'Quote 5')
    const store: Store<RootState> = createStore(inspirationalQuotesService)

    const wrapper = mount(InspirationalQuotes, {
      localVue,
      store
    })
    await flushPromises()

    const children: WrapperArray<Vue> = wrapper.findAll('blockquote')
    for (let i = 0; i < 5; i++) {
      expect(children.at(i).text()).toEqual(`Quote ${i + 1}`)
    }
  })

  it('When refresh button clicked, then new quotes replace the old quotes', async () => {
    const firstBatch = ['Quote 1', 'Quote 2', 'Quote 3', 'Quote 4', 'Quote 5']
    const secondBatch = ['Quote 6', 'Quote 7', 'Quote 8', 'Quote 9', 'Quote 10']
    const inspirationalQuotesService = Substitute.for<InspirationalQuoteService>()
    inspirationalQuotesService.loadQuote().resolves(...firstBatch, ...secondBatch)
    const store: Store<RootState> = createStore(inspirationalQuotesService)
    const wrapper = mount(InspirationalQuotes, {
      localVue,
      store
    })

    await flushPromises()
    wrapper.find('button').trigger('click')
    await flushPromises()

    const children: WrapperArray<Vue> = wrapper.findAll('blockquote')
    for (let i = 0; i < 5; i++) {
      expect(children.at(i).text()).toEqual(`Quote ${i + 6}`)
    }
  })
})
