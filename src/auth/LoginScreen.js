import React, { Component } from 'react'

import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward'
import TextField from 'material-ui/TextField'

import './LoginScreen.styl'

export class LoginScreen extends Component {
  render() {
    return (
      <form>
        <Card className="loginScreen">
          <CardTitle title="Goal Tracker" subtitle="Connexion" />
          <CardText>
            <TextField
              autoFocus
              floatingLabelText="E-mail"
              fullWidth
              hintText="mon@email.tld"
              required
              type="email"
            />
            <TextField
              floatingLabelText="Mot de passe"
              fullWidth
              hintText="super mot de passe"
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

export default LoginScreen
