import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import RedBox from 'redbox-react'

import App from './App'

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
