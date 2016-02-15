import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import HistoryDay from './HistoryDay'

describe('<HistoryDay />', () => {
  const goals = [
    { id: 0, name: 'Demo goal 1', target: 5, units: 'wombats' },
    { id: 1, name: 'Demo goal 2', target: 10, units: 'weazels' },
  ]

  it('should otherwise match the expected snapshot', () => {
    const mock = sinon.useFakeTimers()
    try {
      const stats = { date: '2017-03-23', progresses: { 0: [1, 5] } }
      const wrapper = shallow(<HistoryDay goals={goals} stats={stats} />)

      expect(wrapper).to.matchSnapshot()
    } finally {
      mock.restore()
    }
  })
})
