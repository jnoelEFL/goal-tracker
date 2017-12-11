import PropTypes from 'prop-types'
import React from 'react'

import LinearProgress from 'material-ui/LinearProgress'
import {
  amber500,
  green500,
  orange500,
  red500,
} from 'material-ui/styles/colors'

import { getCompletionRatio } from '../lib/helpers'
import { nonNegativeInteger, positiveInteger } from '../shared/prop-types'

const Gauge = ({ value, max, now }) => {
  if (now == null) {
    now = new Date()
  }
  return (
    <LinearProgress
      color={gaugeColor(value, max, now)}
      max={max}
      mode="determinate"
      style={{ height: 8 }}
      value={value}
    />
  )
}

Gauge.defaultProps = {
  max: 100,
}

// Comme toujours, on définit les propriétés attendues/autorisées pour validation.
Gauge.propTypes = {
  value: nonNegativeInteger.isRequired,
  max: positiveInteger,
  now: PropTypes.any,
}

function gaugeColor(current, target, now) {
  const ratio = getCompletionRatio(current, target, now)

  if (ratio < 0.5) {
    return red500
  }
  if (ratio < 0.75) {
    return orange500
  }
  return ratio < 0.9 ? amber500 : green500
}

export default Gauge
