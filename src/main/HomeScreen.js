import React, { Component } from 'react'

import LoginScreen from '../auth/LoginScreen'
import store from '../store'
import TrackerScreen from './TrackerScreen'

export class HomeScreen extends Component {
  render() {
    const { currentUser: { loginState }, goals, today, todaysProgress } = store

    return loginState === 'success' ? (
      <TrackerScreen
        goals={goals}
        today={today}
        todaysProgress={todaysProgress}
      />
    ) : (
      <LoginScreen />
    )
  }
}

export default HomeScreen
