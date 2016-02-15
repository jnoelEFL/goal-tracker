import { install as installOfflineHandling } from 'offline-plugin/runtime'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import RedBox from 'redbox-react'

import './lib/clock'

import App from './App'

installOfflineHandling()

function renderApp(RootComponent) {
  render(
    <AppContainer errorReporter={RedBox} warnings={false}>
      <RootComponent />
    </AppContainer>,
    document.getElementById('root')
  )
}

renderApp(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    renderApp(NextApp)
  })
  module.hot.accept()
}
