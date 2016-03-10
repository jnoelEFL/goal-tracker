// Paramètres (conteneur)
// ======================

// Ce conteneur est particulièrement intéressant car il illustre de nombreux
// aspects de React et ES6.  On y trouve notamment un import “espace de noms”,
// une surcharge de constructeur, des méthodes métier décorées ou non, des
// méthodes de cycle de vie de composant React, et le recours à `bindActionCreators`
// et `mapDispatchToProps`.  Pas mal!

import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import { List, ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'
import Logout from 'material-ui/svg-icons/action/exit-to-app'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'

import { logOut } from '../reducers/currentUser'
import { addGoal, removeGoal, updateGoal } from '../reducers/goals'
import { CurrentUserPropType, GoalPropType } from '../shared/prop-types'
import AddSettingDialog from './AddSettingDialog'
import DeleteSettingDialog from './DeleteSettingDialog'
import GoalSetting from './GoalSetting'

const DEFAULT_STATE = { goal: {}, dialog: null }

// Le composant conteneur
// ----------------------

class SettingsScreen extends Component {
  static propTypes = {
    addGoal: PropTypes.func.isRequired,
    currentUser: CurrentUserPropType.isRequired,
    goals: PropTypes.arrayOf(GoalPropType).isRequired,
    logOut: PropTypes.func.isRequired,
    removeGoal: PropTypes.func.isRequired,
    updateGoal: PropTypes.func.isRequired,
  }

  // Lorsqu’une classe ES6 de composant React a un état transient
  // (`this.state`), la norme est de l'initialiser à la construction
  // (par défaut, il vaut `null`).
  constructor(...args) {
    super(...args)
    this.state = DEFAULT_STATE
  }

  // Pour plus de détails sur cette syntaxe `@autobind`, voyez la documentation
  // du conteneur de connexion.
  @autobind
  addOrUpdateGoal({ id, name, target, units, keepOpen }) {
    const { addGoal, updateGoal } = this.props
    if (id !== undefined) {
      updateGoal(id, name, target, units)
      keepOpen = false
    } else {
      addGoal(name, target, units)
    }
    if (!keepOpen) {
      this.closeDialogs()
    }
  }

  @autobind
  closeDialogs() {
    this.setState(DEFAULT_STATE)
  }

  @autobind
  deleteSelectedGoal() {
    this.props.removeGoal(this.state.goal.id)
    this.closeDialogs()
  }

  @autobind
  openGoalAdder() {
    this.setState({ goal: {}, dialog: 'add-or-update' })
  }

  openGoalDeleter(goal) {
    this.setState({ goal, dialog: 'delete' })
  }

  openGoalEditor(goal) {
    this.setState({ goal, dialog: 'add-or-update' })
  }

  render() {
    const { currentUser, goals, logOut } = this.props
    const logoutButton = (
      <IconButton onClick={logOut}>
        <Logout />
      </IconButton>
    )

    return (
      // Enrobage par un
      // [`<DocumentTitle>`](https://github.com/gaearon/react-document-title)
      // pour modifier automatiquement le titre de la fenêtre lorsqu’on affiche
      // ce composant conteneur.
      <DocumentTitle title="Mes paramètres">
        <div>
          <FlatButton
            containerElement={<Link to="/" />}
            icon={<ArrowBack />}
            label="Retour"
          />
          <Card className="settings">
            <CardTitle title="Paramètres" />
            <CardText>
              <List>
                <ListItem
                  primaryText="Vous êtes connecté-e en tant que"
                  rightIconButton={logoutButton}
                  secondaryText={currentUser.email}
                />
              </List>
              <Divider />
              <List>
                <Subheader>Mes objectifs</Subheader>
                {goals.map((goal) => (
                  <GoalSetting
                    goal={goal}
                    key={goal.id}
                    // Remarquez que puisqu’on a besoin de passer un argument à nos
                    // méthodes ici, on doit utiliser une fonction dédiée, et comme
                    // c'est une fonction fléchée, on préserve le `this`.  Du coup,
                    // inutile de décorer ces deux méthodes par `@autobind`.
                    onDeleteClick={() => this.openGoalDeleter(goal)}
                    onEditClick={() => this.openGoalEditor(goal)}
                  />
                ))}
                {goals.length === 0 && (
                  <ListItem secondaryText="Aucun objectif pour le moment" />
                )}
              </List>
            </CardText>
            <CardActions>
              <RaisedButton
                icon={<ContentAdd />}
                label="Ajouter un objectif"
                // En revanche, ici, on passe une référence (et pareil pour les
                // dialogues ci-après), du coup les méthodes concernées sont *bound*.
                onClick={this.openGoalAdder}
                primary
              />
            </CardActions>
          </Card>
          <AddSettingDialog
            goal={this.state.goal}
            onCancel={this.closeDialogs}
            open={this.state.dialog === 'add-or-update'}
          />
          <DeleteSettingDialog
            goal={this.state.goal}
            onCancel={this.closeDialogs}
            onDelete={this.deleteSelectedGoal}
            open={this.state.dialog === 'delete'}
          />
        </div>
      </DocumentTitle>
    )
  }
}

// Connexion au *store* Redux
// --------------------------

// On s’intéresse uniquement aux champs `goals` et `currentUser` de l’état global,
// qu’on veut retrouver dans nos propriétés sous les mêmes noms.  Par ricochet,
// seuls les changements apportés à ces champs entraîneront un éventuel *re-render*
// de notre conteneur.
const mapStateToProps = ({ goals, currentUser }) => ({ goals, currentUser })

// C’est [`connect(…)`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options),
// fourni par Redux, qui fait les connexions nécessaires pour nous
// fournir les propriétés, implémenter notre `shouldComponentUpdate(…)` et nous fournir
// aussi une propriété `dispatch(…)`, pré-associée au *store* Redux transmis via le
// contexte React.
//
// Voici le seul exemple de `mapDispatchToProps` de l’application.  On s'en sert
// pour fournir comme propriétés des fonctions qui ne sont pas juste les *action
// creators* nus (qui renverraient simplement le descripteur d'action), mais carrément
// des *appels `dispatch` préconfigurés.  Puisqu’ici on passe un objet plutôt que notre
// propre implémentation, il applique ce comportement par défaut en supposant que toutes
// les valeurs de l’objet sont des *action creators*.
export default connect(mapStateToProps, {
  addGoal,
  logOut,
  removeGoal,
  updateGoal,
})(SettingsScreen)
