import {
  and,
  between,
  integer,
  keysOf,
  nonNegativeInteger,
} from 'airbnb-prop-types'
import PropTypes from 'prop-types'

export { nonNegativeInteger }

export const positiveInteger = and([integer(), between({ gt: 0 })])

export const GoalPropType = PropTypes.shape({
  id: nonNegativeInteger.isRequired,
  name: PropTypes.string.isRequired,
  target: PropTypes.number.isRequired,
  units: PropTypes.string.isRequired,
})

export const TodaysProgressPropType = and([
  keysOf(nonNegativeIntegerString),
  PropTypes.objectOf(nonNegativeInteger),
])

function nonNegativeIntegerString(props, propName, componentName) {
  const value = props[propName]
  const numberValue = Number(value)

  if (
    typeof value !== 'string' ||
    !Number.isInteger(numberValue) ||
    numberValue < 0
  ) {
    return new Error(
      `${propName} in ${componentName} must be a string representing a non-negative integer`
    )
  }

  return null
}
