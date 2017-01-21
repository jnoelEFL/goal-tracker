import moment from 'moment'

// Types d’actions
// ---------------

const CLOSE_DAY = 'goal-tracker/closeDay/CLOSE_DAY'

// Réducteur
// ---------

export default function reduceCloseDay(state, action) {
  switch (action.type) {
    case CLOSE_DAY:
      return {
        ...state,
        history: tallyPreviousDay(state),
        today: moment().format('YYYY-MM-DD'),
        todaysProgress: {},
      }

    default:
      return state
  }
}

// Action Creators
// ---------------

export function closeDay() {
  return { type: CLOSE_DAY }
}

// Utilitaires
// -----------

function tallyPreviousDay({ goals, history, today, todaysProgress }) {
  const historyEntry = {
    date: today,
    progresses: goals.reduce((acc, { id, target }) => {
      const progress = todaysProgress[id] || 0
      if (progress > 0) {
        acc[id] = [progress, target]
      }
      return acc
    }, {}),
  }

  return [historyEntry, ...history]
}
