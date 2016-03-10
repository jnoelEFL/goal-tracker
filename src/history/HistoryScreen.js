// Historique (conteneur)
// ======================
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import ClearIcon from 'material-ui/svg-icons/content/clear'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'

import { clearHistory } from '../reducers/history'
import { GoalPropType, HistoryDayStatsPropType } from '../shared/prop-types'
import HistoryDay from './HistoryDay'

// Le composant conteneur
// ----------------------
class HistoryScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    goals: PropTypes.arrayOf(GoalPropType).isRequired,
    history: PropTypes.arrayOf(HistoryDayStatsPropType).isRequired,
  }

  render() {
    // Déstructuration des `props` pour bénéficier d’identifiants courts
    const { goals, history, dispatch } = this.props
    return (
      // Enrobage par un
      // [`<DocumentTitle>`](https://github.com/gaearon/react-document-title)
      // pour modifier automatiquement le titre de la fenêtre lorsqu’on affiche
      // ce composant conteneur.
      //
      // Quand on fait un bouton destiné à être en fait un lien, surtout au
      // sein d’un [`<Link>`](https://github.com/reactjs/react-router-
      // tutorial/blob/start/lessons/03-navigating-with-link.md), on utilise
      // la propriété [`linkButton`](http://www.material-ui.com/#/components
      // /raised-button) et on enrobe grâce à
      // [`containerElement`](https://github.com/callemall/material-
      // ui/issues/850).
      <DocumentTitle title="Mon historique">
        <div>
          <FlatButton
            containerElement={<Link to="/" />}
            icon={<ArrowBack />}
            label="Retour"
          />
          <Card className="history">
            <CardTitle title="Historique" />
            <CardText>
              {history.map((dayStats) => (
                // Pensez bien à toujours définir une association unique et *stable*
                // entre l’objet de base et son composant au sein d’un `map`,
                // [grâce à la propriété `key`](http://facebook.github.io/react/docs/reconciliation.html#keys).
                // Sinon, React va s’emmêler les pinceaux quand
                // le tableau sous-jacent change (suppression, réordonnancement…).
                <HistoryDay
                  goals={goals}
                  key={dayStats.date}
                  stats={dayStats}
                />
              ))}
              {// Ici en revanche, on a l’exemple classique du “if”
              // [façon JSX](http://facebook.github.io/react/tips/if-else-in-JSX.html) :
              // une condition suivie d’un et (`&&`) et du composant.  Si on avait un `else`
              // en plus, on préfèrerait un ternaire avec éventuellement des parenthèses
              // autour de chaque partie si au moins l’une d’elles est multi-lignes.
              // Voir à ce sujet [React Patterns](http://reactpatterns.com/#conditional-rendering).
              history.length === 0 && <p>Aucun historique disponible</p>}
            </CardText>
            {history.length > 0 && (
              <CardActions>
                <RaisedButton
                  icon={<ClearIcon />}
                  label="Réinitialiser"
                  onClick={() => dispatch(clearHistory())}
                />
              </CardActions>
            )}
          </Card>
        </div>
      </DocumentTitle>
    )
  }
}

// Connexion au *store* Redux
// --------------------------

// On s’intéresse uniquement aux champs `goals` et `history` de l’état global,
// qu’on veut retrouver dans nos propriétés sous les mêmes noms.  Par ricochet,
// seuls les changements apportés à ces champs entraîneront un éventuel *re-render*
// de notre conteneur.
const mapStateToProps = ({ goals, history }) => ({ goals, history })

// C’est [`connect(…)`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options),
// fourni par Redux, qui fait les connexions nécessaires pour nous
// fournir les propriétés, implémenter notre `shouldComponentUpdate(…)` et nous fournir
// aussi une propriété `dispatch(…)`, pré-associée au *store* Redux transmis via le
// contexte React.
export default connect(mapStateToProps)(HistoryScreen)
