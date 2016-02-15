// Types d’actions
// ---------------

const LOGIN_FAILURE = 'goal-tracker/currentUser/AUTH_LOGIN_FAILURE'
const LOGIN_START = 'goal-tracker/currentUser/AUTH_LOGIN_START'
const LOGIN_SUCCESS = 'goal-tracker/currentUser/AUTH_LOGIN_SUCCESS'
const LOGOUT = 'goal-tracker/currentUser/AUTH_LOGOUT'

// Réducteur
// ---------

export default function reduceCurrentUser(
  state = { loginState: 'logged-out' },
  action
) {
  switch (action.type) {
    case LOGIN_START:
      return { loginState: 'pending' }

    case LOGIN_FAILURE:
      return { loginState: 'failure' }

    case LOGIN_SUCCESS: {
      const { email } = action.payload
      return { loginState: 'success', email }
    }

    case LOGOUT:
      return { loginState: 'logged-out' }

    default:
      return state
  }
}

// Action Creators
// ---------------

export function logIn(email, password) {
  const body = JSON.stringify({ email, password })

  return {
    type: LOGIN_START,
    meta: {
      offline: {
        effect: { url: '/api/v1/sessions', method: 'POST', body },
        commit: { type: LOGIN_SUCCESS, payload: { email } },
        rollback: { type: LOGIN_FAILURE },
      },
    },
  }
}

export function logInFailure() {
  return { type: LOGIN_FAILURE }
}

export function logInStart() {
  return { type: LOGIN_START }
}

export function logInSuccess(email) {
  return { type: LOGIN_SUCCESS, payload: { email } }
}

export function logOut() {
  return { type: LOGOUT }
}