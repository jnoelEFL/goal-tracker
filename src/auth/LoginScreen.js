import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward'
import TextField from 'material-ui/TextField'

import './LoginScreen.styl'

import { logIn } from '../reducers/currentUser'

export class LoginScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  @autobind
  login(event) {
    event.preventDefault()
    this.props.dispatch(logIn(this.userEmail, this.password))
  }

  render() {
    return (
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
              icon={<ArrowForward />}
              label="Connecte-toi"
              labelPosition="before"
              primary
              type="submit"
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

export default connect()(LoginScreen)
