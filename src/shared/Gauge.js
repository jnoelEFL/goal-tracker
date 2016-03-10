// Jauge
// =====
//
// Réutilisé absolument partout dans l’application…  Un parfait
// exemple de composant réutilisable, du coup !
//
// On prend soin de n’importer que les quelques couleurs qui nous intéressent (le module
// en contient des centaines) pour favoriser le *tree shaking* en mode production.
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

// En définissant les valeurs par défaut dans `defaultProps`
// au lieu des valeurs par défaut de la signature, on s’assure
// qu’elles seront bien prises en compte avant l’exploitation des
// `propTypes` ci-après.
Gauge.defaultProps = {
  max: 100,
}

// Comme toujours, on définit les propriétés attendues/autorisées pour validation.
Gauge.propTypes = {
  value: nonNegativeInteger.isRequired,
  max: positiveInteger,
  now: PropTypes.any,
}

// C’est ici qu’on calcule la couleur de la jauge d’après le rapport entre son
// propre taux d’achèvement et le moment de la journée.
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
