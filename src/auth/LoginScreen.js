import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'

import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward'
import TextField from 'material-ui/TextField'

import './LoginScreen.styl'

import { logIn } from '../reducers/currentUser'
import { LoginStatePropType } from '../shared/prop-types'

export class LoginScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loginState: LoginStatePropType.isRequired,
  }

  @autobind
  login(event) {
    event.preventDefault()
    this.props.dispatch(logIn(this.userEmail, this.password))
  }

  render() {
    const { loginState } = this.props
    const loggingIn = loginState === 'pending'
    const logInIcon = loggingIn ? null : <ArrowForward />
    const snackBar =
      loginState === 'failure' ? (
        <Snackbar
          autoHideDuration={2000}
          message="Identifiant ou mot de passe invalide"
          open
        />
      ) : (
        ''
      )

    return (
      <DocumentTitle title="Identifiez-vous">
        <form onSubmit={this.login}>
          <Card className="loginScreen">
            <CardTitle title="Goal Tracker" subtitle="Connexion" />
            <CardText>
              <TextField
                autoFocus
                floatingLabelText="E-mail"
                fullWidth
                hintText="mon@email.tld"
                onChange={(event) => {
                  this.userEmail = event.target.value
                }}
                required
                type="email"
              />
              <TextField
                floatingLabelText="Mot de passe"
                fullWidth
                hintText="super mot de passe"
                onChange={(event) => {
                  this.password = event.target.value
                }}
                required
                type="password"
              />
            </CardText>
            <CardActions style={{ textAlign: 'center' }}>
              <RaisedButton
                disabled={loggingIn}
                icon={logInIcon}
                label="Connecte-toi"
                labelPosition="before"
                primary
                type="submit"
              />
            </CardActions>
          </Card>
          {snackBar}
        </form>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = ({ currentUser: { loginState } }) => ({ loginState })

export default connect(mapStateToProps)(LoginScreen)
