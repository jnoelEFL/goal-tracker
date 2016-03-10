// État central Redux
// ==================
import { offline } from '@redux-offline/redux-offline'
import offlineConfig from '@redux-offline/redux-offline/lib/defaults'
import localForage from 'localforage'
import moment from 'moment'
import { compose, createStore } from 'redux'

import goalTrackerReducer from './reducers'

// L’état consolidé de l’application est géré par [Redux](http://redux.js.org/).
// La [seule manière de le faire évoluer](http://redux.js.org/docs/basics/DataFlow.html)
// est d’appeler sa méthode `dispatch(…)` en lui transmettant un
// [descripteur d’action](http://redux.js.org/docs/basics/Actions.html)
// (normalement fourni par une des fonctions de `action-creators.js`).
//
// L’état en question est *immutable* : il n’est jamais modifié en place,
// mais génère à chaque fois une nouvelle version de lui-même, si besoin.
//
// Le descriptif de ces évolutions est fourni par les
// [*reducers*](http://redux.js.org/docs/basics/Reducers.html),
// qui sont combinés pour fournir un *reducer* unique, utilisé à la création du
// *store* Redux.

// Le *reducer* principal, qui pilote toutes les évolutions de l’état.
// État par défaut, utile pour notre développement mais qui serait sûrement
// beaucoup plus réduit en production.
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

// Améliorations des capacités de base du *store* Redux à l’aide d’une
// composée de fonctions *enhancers*.  On y trouve la connexion aux
// [Redux Dev Tools](https://github.com/zalmoxisus/redux-devtools-extension),
// s’ils sont installés dans le navigateur, ainsi que la gestion de la
// persistance côté client et des appels API par
// [redux-offline](https://github.com/jevakallio/redux-offline).
const enhancer = compose(
  offline(reduxOfflineConfig),
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (x) => x
)

// Création à proprement parler du *store*, en fournissant son
// *reducer* (au minimum), un état par défaut et la composée d’*enhancers*
// à y injecter.
const store = createStore(goalTrackerReducer, DEFAULT_STATE, enhancer)

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextGTR = require('./reducers').default
    store.replaceReducer(nextGTR)
  })
}

// Le *store* est l’export par défaut.
export default store
