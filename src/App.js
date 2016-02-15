import React from 'react'
import { Provider } from 'react-redux'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import HomeScreen from './main/HomeScreen'
import store from './store'

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <HomeScreen />
    </MuiThemeProvider>
  </Provider>
)

export default App
