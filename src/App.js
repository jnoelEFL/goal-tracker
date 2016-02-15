import React from 'react'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import HomeScreen from './main/HomeScreen'

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <HomeScreen />
  </MuiThemeProvider>
)

export default App
