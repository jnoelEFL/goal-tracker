import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ContentAdd from 'material-ui/svg-icons/content/add'

import Gauge from '../shared/Gauge'
import GoalTrackerWidget from './GoalTrackerWidget'

describe('<GoalTrackerWidget />', () => {
  const goal = { id: 0, name: 'My goal', target: 42, units: 'wombats' }

  describe('when not completed', () => {
    it('should render appropriately', () => {
      for (const progress of [0, 1, 21, 41]) {
        const wrapper = shallow(
          <GoalTrackerWidget goal={goal} progress={progress} />
        )

        expect(wrapper.find('h2')).to.have.text(goal.name)
        expect(wrapper).to.contain(<Gauge value={progress} max={goal.target} />)
        expect(wrapper).to.contain.text(
          `${progress} ${goal.units} sur ${goal.target}`
        )
        expect(wrapper).to.contain(<ContentAdd />)
      }
    })

    it('should trigger its onProgress on click', () => {
      const progress = 21
      const onProgress = sinon.spy()
      const wrapper = shallow(
        <GoalTrackerWidget
          goal={goal}
          onProgress={onProgress}
          progress={progress}
        />
      )

      wrapper.find('FloatingActionButton').simulate('click')
      expect(onProgress)
        .to.have.been.calledOnce()
        .and.calledWith(goal)
    })

    it('should otherwise match the expected snapshot', () => {
      const mock = sinon.useFakeTimers()
      try {
        const wrapper = shallow(<GoalTrackerWidget goal={goal} progress={21} />)

        expect(wrapper).to.matchSnapshot()
      } finally {
        mock.restore()
      }
    })
  })

  describe('when completed (or exceeded)', () => {
    it('should render appropriately', () => {
      for (const progress of [goal.target, goal.target + 1, goal.target + 10]) {
        const wrapper = shallow(
          <GoalTrackerWidget goal={goal} progress={progress} />
        )

        expect(wrapper).not.to.contain(<ContentAdd />)
        expect(wrapper).to.contain(<ActionThumbUp />)
      }
    })

    it('should otherwise match the expected snapshot', () => {
      const mock = sinon.useFakeTimers()
      try {
        const wrapper = shallow(<GoalTrackerWidget goal={goal} progress={42} />)

        expect(wrapper).to.matchSnapshot()
      } finally {
        mock.restore()
      }
    })
  })
})
