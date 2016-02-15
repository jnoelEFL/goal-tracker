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

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <HomeScreen />
    </MuiThemeProvider>
  </Provider>
)

export default App
