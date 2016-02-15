import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import LoginScreen from '../auth/LoginScreen'
import TrackerScreen from './TrackerScreen'

export class HomeScreen extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
  }

  render() {
    return this.props.loggedIn ? <TrackerScreen /> : <LoginScreen />
  }
}

function mapStateToProps({ currentUser: { loginState } }) {
  return { loggedIn: loginState === 'success' }
}

export default connect(mapStateToProps)(HomeScreen)
