// Suivi du jour pour un objectif
// ==============================
import PropTypes from 'prop-types'
import React from 'react'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ContentAdd from 'material-ui/svg-icons/content/add'

import Gauge from '../shared/Gauge'
import { GoalPropType, nonNegativeInteger } from '../shared/prop-types'

// Section de l'écran principal, dédiée à un objectif.
// Fournit notamment le descriptif de l'objectif et l’éventuel bouton de progression.

// La déstructuration en force !
const GoalTrackerWidget = ({
  goal,
  goal: { name, units, target },
  progress,
  onProgress,
}) => {
  // La beauté d'un ternaire multi-lignes…
  const adderComponent =
    target > progress ? (
      <FloatingActionButton
        mini
        onClick={() => onProgress && onProgress(goal)}
        secondary
      >
        <ContentAdd />
      </FloatingActionButton>
    ) : (
      <FloatingActionButton mini disabled>
        <ActionThumbUp />
      </FloatingActionButton>
    )

  return (
    <div className="goal">
      <div className="summary">
        <h2>{name}</h2>
        <Gauge value={progress} max={target} />
        <small>
          {progress} {units} sur {target}
        </small>
      </div>
      <div className="cta">{adderComponent}</div>
    </div>
  )
}

// Comme toujours, on définit les propriétés attendues/autorisées pour validation.
GoalTrackerWidget.propTypes = {
  goal: GoalPropType.isRequired,
  progress: nonNegativeInteger.isRequired,
  onProgress: PropTypes.func,
}

export default GoalTrackerWidget
