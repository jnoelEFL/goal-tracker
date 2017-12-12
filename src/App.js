import React from 'react'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import HomeScreen from './main/HomeScreen'
import Layout from './main/Layout'

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Layout>
      <HomeScreen />
    </Layout>
  </MuiThemeProvider>
)

export default App
