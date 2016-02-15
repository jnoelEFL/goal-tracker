import { expect } from 'chai'

import reducer, { addGoal, removeGoal, updateGoal } from './goals'

describe('Goals reducer', () => {
  it('should return its initial state', () => {
    const initialState = undefined
    const expectedState = []

    expect(reducer(initialState, {})).to.deep.equal(expectedState)
  })

  it('should handle goal addition')

  it('should handle goal removal')

  it('should handle goal update (when in goals)')
})
