// Composant principal applicatif
// ==============================
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import HistoryScreen from './history/HistoryScreen'
import HomeScreen from './main/HomeScreen'
import SettingsScreen from './settings/SettingsScreen'
import PrivateRoute from './shared/PrivateRoute'
import store from './store'

// Imports de modules tiers
// ------------------------

const App = () => (
  // On enrobe le tout par le
  // [`Provider`](http://redux.js.org/docs/basics/UsageWithReact.html#passing-the-store)
  // de Redux, pour que l’état
  // central et sa méthode `dispatch` puissent être accessibles à travers
  // toute l’arborescence de rendu.
  //
  // Ensuite on décrit les routes (imbriquées) de l’application, avec leurs
  // composants associés.  L’implémentation d’historique fournie explicitement
  // permet d’utiliser un historique basé `pushState` plutôt que celui, par
  // défaut, basé hash (parties `#…` des URLs).  Cela suppose toutefois une
  // capacité du serveur à retourner notre appli client correctement
  // configurée pour toutes ces “URLs profondes”.
  //
  // Les autres routes de l’application étant situées “en dessous” de la route
  // principale (`/`), il faut indiquer quel contenu afficher pour cette route
  // racine (puisqu’il y en a un).  C’est le rôle de `IndexRoute`, qui revient
  // à dire “la route parent, sans rien derrière”.
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Router>
        <div>
          <Route exact path="/" component={HomeScreen} />
          <PrivateRoute exact path="/settings" component={SettingsScreen} />
          <PrivateRoute exact path="/history" component={HistoryScreen} />
        </div>
      </Router>
    </MuiThemeProvider>
  </Provider>
)

export default App
