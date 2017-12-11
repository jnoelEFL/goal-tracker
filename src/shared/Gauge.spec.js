import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'

import Gauge from './Gauge'

describe('<Gauge />', () => {
  it('should render appropriately', () => {
    const wrapper = shallow(<Gauge value={50} />)

    expect(wrapper).to.have.prop('mode', 'determinate')
    expect(wrapper).to.have.prop('max', 100)
    expect(wrapper).to.have.prop('value', 50)
    expect(wrapper)
      .to.have.prop('style')
      .that.deep.equals({ height: 8 })
  })

  it('should honor custom max', () => {
    const wrapper = shallow(<Gauge value={50} max={75} />)

    expect(wrapper).to.have.prop('max', 75)
  })

  it('should otherwise match the expected snapshot', () => {
    const now = new Date(Date.UTC(2017, 11, 12, 12, 0, 0, 0))
    const wrapper = shallow(<Gauge value={50} now={now} />)

    expect(wrapper).to.matchSnapshot()
  })
})
