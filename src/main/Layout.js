import PropTypes from 'prop-types'
import React from 'react'

import './Layout.styl'

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header>Goal Tracker</header>
      <main>{children}</main>
      <footer>© 2017 Delicious Insights</footer>
    </div>
  )
}
Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout
