import { AppContainer } from 'react-hot-loader'
import React from 'react'
import RedBox from 'redbox-react'
import { render } from 'react-dom'

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
