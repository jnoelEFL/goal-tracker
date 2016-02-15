import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ContentAdd from 'material-ui/svg-icons/content/add'

import Gauge from '../shared/Gauge'
import GoalTrackerWidget from './GoalTrackerWidget'

describe('<GoalTrackerWidget />', () => {
  describe('when not completed', () => {
    it('should render appropriately')

    it('should trigger its onProgress on click')

    it('should otherwise match the expected snapshot')
  })

  describe('when completed (or exceeded)', () => {
    it('should render appropriately')

    it('should otherwise match the expected snapshot')
  })
})
