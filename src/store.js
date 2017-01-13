import { offline } from '@redux-offline/redux-offline'
import offlineConfig from '@redux-offline/redux-offline/lib/defaults'
import localForage from 'localforage'
import moment from 'moment'
import { compose, createStore } from 'redux'

import goalTrackerReducer from './reducers'

const DEFAULT_STATE = {
  currentUser: {
    loginState: 'success',
    email: 'christophe@delicious-insights.com',
  },
  goals: [
    { id: 0, name: 'Apprendre React', target: 5, units: 'aspects' },
    { id: 1, name: 'Apprendre Redux', target: 2, units: 'vidéos' },
    { id: 2, name: 'Apprendre Webpack', target: 3, units: 'pages de doc' },
  ],
  today: moment().format('YYYY-MM-DD'),
  todaysProgress: { 0: 1, 1: 1, 2: 1 },
  history: [
    {
      date: moment()
        .subtract(1, 'day')
        .format('YYYY-MM-DD'),
      progresses: {
        0: [2, 5],
        1: [1, 2],
      },
    },
    {
      date: moment()
        .subtract(2, 'days')
        .format('YYYY-MM-DD'),
      progresses: {
        0: [4, 5],
        1: [1, 2],
        2: [2, 3],
      },
    },
    {
      date: moment()
        .subtract(3, 'days')
        .format('YYYY-MM-DD'),
      progresses: {
        0: [3, 5],
        1: [2, 2],
        2: [1, 3],
      },
    },
  ],
}

const reduxOfflineConfig = {
  ...offlineConfig,
  persistOptions: {
    storage: localForage,
  },
}

const enhancer = compose(
  offline(reduxOfflineConfig),
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (x) => x
)

const store = createStore(goalTrackerReducer, DEFAULT_STATE, enhancer)

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextGTR = require('./reducers').default
    store.replaceReducer(nextGTR)
  })
}

export default store
