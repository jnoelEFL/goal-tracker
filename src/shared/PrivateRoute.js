import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => <PrivateComponent component={component} {...props} />}
  />
)

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
}

class PrivateInnerComponent extends Component {
  static propTypes = {
    component: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
  }

  render() {
    const { component, loggedIn, ...props } = this.props
    const shouldPush = props.history.action === 'PUSH'

    if (loggedIn) {
      return React.createElement(component, props)
    }

    return (
      <Redirect
        push={shouldPush}
        to={{ pathname: '/', state: { from: props.location } }}
      />
    )
  }
}

const mapStateToProps = ({ currentUser: { loginState } }) => ({
  loggedIn: loginState === 'success',
})
const PrivateComponent = connect(mapStateToProps)(PrivateInnerComponent)

export default PrivateRoute
