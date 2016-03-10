// Connexion (conteneur)
// =====================
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

// Le composant conteneur
// ----------------------

export class LoginScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loginState: LoginStatePropType.isRequired,
  }

  // La syntaxe ci-dessous utilise la
  // [proposition décorateurs pour ES8+](https://github.com/wycats/javascript-decorators)
  // qui facilite l’utilisation de décoration par fonctions d’ordre supérieur
  // (*Higher-Order Functions*, ou *HOF* pour faire court).  La syntaxe ne fournit aucun
  // décorateur particulier, car ils sont appliqués à l'exécution, et peuvent donc être
  // codés librement pour “étendre” le langage.
  //
  // Nous utilisons ici le décorateur `autobind` fourni par un module ciblé,
  // [`autobind-decorator`](https://www.npmjs.com/package/autobind-decorator), mais
  // on trouve aussi des modules plus riches qui tentent de fournir tous les
  // “[décorateurs usuels](https://www.npmjs.com/package/core-decorators)”.
  // Le principe du *auto-binding* est qu’à l'instanciation, la propriété est
  // automatiquement redéfinie sur l'instance (plutôt que déléguée au prototype)
  // avec une version *bound* de la fonction d'origine.  Ainsi, on peut librement
  // passer une référence à la méthode sans garantir manuellement le `this`.  C'est
  // notamment très utile pour les *props* JSX de type gestionnaire d'événement.
  //
  // Notez que ce décorateur peut aussi marcher au niveau global de la classe, et
  // s'applique alors à toutes les méthodes.  Mais c'est une approche bulldozer,
  // rarement justifiée.
  //
  // Notez que Babel 6 ne gère pas encore les décorateurs, car la spec et la syntaxe
  // sont en train de subir une évolution massive.  Il est nécessaire d’utiliser un
  // [plugin Babel de transformation rétrocompatible](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy).
  @autobind
  login(event) {
    // On commence par empêcher le traitement par défaut de l'événement `submit`,
    // qui déclencherait un envoi du formulaire au serveur.  Et **non, on n’utilise
    // pas `return false`**, qui est une extension jQuery qui, en plus, appellerait
    // stopPropagation(), ce qui n’est pas souhaitable (et ne marche pas sans jQuery).
    event.preventDefault()
    this.props.dispatch(logIn(this.userEmail, this.password))
  }

  render() {
    // On définit quelques flags et éléments variables de notre UI suivant
    // l’étape de login en cours : délogué, login en cours, login réussi, login
    // échoué.
    const { loginState } = this.props
    const loggingIn = loginState === 'pending'
    const logInIcon = loggingIn ? null : <ArrowForward />
    // En cas d’échec explicite, une *[snackbar](http://www.material-ui.com/#/components/snackbar)*
    // apparaîtra 2s en bas de la fenêtre, pour nous signifier le souci.
    const snackBar =
      loginState === 'failure' ? (
        <Snackbar
          autoHideDuration={2000}
          open
          message="Identifiant ou mot de passe invalide"
        />
      ) : (
        ''
      )

    return (
      // Enrobage par un
      // [`<DocumentTitle>`](https://github.com/gaearon/react-document-title)
      // pour modifier automatiquement le titre de la fenêtre lorsqu’on affiche
      // ce composant conteneur.
      //
      // Notez l'absence de *binding* explicite pour `this.login`, la méthode
      // étant décorée par `autobind`.
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
                // On souhaite éviter de faire des *controlled fields* connectés
                // de façon trop étroite à l'état transient (`this.state`), aussi
                // on se contente de tenir à jour les valeurs dans des propriétés
                // (au sens JS) libres du composant (`userEmail', `password`).
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

// Connexion au *store* Redux
// --------------------------

// C’est [`connect(…)`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options),
// fourni par Redux, qui fait les connexions nécessaires pour nous
// fournir les propriétés éventuelles (ici, aucune ne nous intéresse), implémenter
// notre `shouldComponentUpdate(…)`, mais aussi et surtout nous fournir une propriété
// `dispatch(…)`, pré-associée au *store* Redux transmis via le contexte React.  On en
// a besoin ici dans `logIn()` pour déclencher l’évolution du store à la “connexion”,
// mais aussi pour récupérer le chemin `currentUser.loginState` de l’état global,
// afin de réagir visuellement aux étapes successives du login asynchrone.
const mapStateToProps = ({ currentUser: { loginState } }) => ({ loginState })

export default connect(mapStateToProps)(LoginScreen)
