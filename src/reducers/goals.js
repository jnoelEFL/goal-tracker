// Objectifs (reducer)
// ===================

// *(Structuration de type [Ducks](https://github.com/erikras/ducks-modular-redux))*

// Types d’actions
// ---------------

const ADD_GOAL = 'goal-tracker/goals/GOALS_ADD'
const REMOVE_GOAL = 'goal-tracker/goals/GOALS_DEL'
const UPDATE_GOAL = 'goal-tracker/goals/GOALS_UPDATE'

// Réducteur
// ---------

// Par défaut, `goals` vaut `[]` (pas d’objectifs définis)
export default function reduceGoals(state = [], action) {
  switch (action.type) {
    // Ajout d’objectif
    // ----------------
    case ADD_GOAL: {
      // On prend les champs qui nous intéressent
      const { name, target, units } = action.payload
      // On calcule un nouvel ID d’objectif, qui vaut le maximum
      // de ceux existants, plus un.
      //
      // L’approche un poil moins « pure fonctionnelle » serait :
      // ```js
      // const id = Math.max(...state.map((goal) => goal.id), -1) + 1
      // ````
      //
      // Si aucun objectif n’est défini,
      // on ferait un `Math.max()` sans argument, ce qui renverrait
      // `-Infinity`, pas top ; par conséquent, on ajoute un dernier
      // argument, `-1`, qui garantit une valeur valide au démarrage.
      // Ainsi, le premier `id` sera fatalement zéro (-1 + 1).
      const id = state.reduce((max, { id }) => (max > id ? max : id), -1) + 1
      // Version “immutable” (génère une nouvelle valeur plutôt que
      // de modifier le tableau existant) de `.push(…)`.
      return [...state, { id, name, target, units }]
    }

    // Retrait d’objectif
    // ------------------
    case REMOVE_GOAL:
      return state.filter(({ id }) => id !== action.payload.id)

    // Mise à jour (voire ajout) d’objectif
    // ------------------------------------
    case UPDATE_GOAL: {
      return state.map(
        (goal) => (goal.id === action.payload.id ? action.payload : goal)
      )
    }

    default:
      // Rappel : un *reducer* doit **toujours** renvoyer l’état
      // sans modification si l’action n’est pas applicable.
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
