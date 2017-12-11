// Types d’actions
// ---------------

const ADD_GOAL = 'goal-tracker/goals/GOALS_ADD'
const REMOVE_GOAL = 'goal-tracker/goals/GOALS_DEL'
const UPDATE_GOAL = 'goal-tracker/goals/GOALS_UPDATE'

// Réducteur
// ---------

export default function reduceGoals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL: {
      const { name, target, units } = action.payload
      // L’approche un poil moins « pure fonctionnelle » serait :
      // ```js
      // const id = Math.max(...state.map((goal) => goal.id), -1) + 1
      // ````
      const id = state.reduce((max, { id }) => (max > id ? max : id), -1) + 1
      return [...state, { id, name, target, units }]
    }

    case REMOVE_GOAL:
    // Votre code ici

    case UPDATE_GOAL: {
      // Votre code ici
    }

    default:
      return state
  }
}

// Action Creators
// ---------------

export function addGoal(name, target, units) {
  return { type: ADD_GOAL, payload: { name, target, units } }
}

export function removeGoal(id) {
  return { type: REMOVE_GOAL, payload: { id } }
}

export function updateGoal(id, name, target, units) {
  return { type: UPDATE_GOAL, payload: { id, name, target, units } }
}
