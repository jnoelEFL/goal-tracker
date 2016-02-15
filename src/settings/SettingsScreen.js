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

class SettingsScreen extends Component {
  static propTypes = {
    addGoal: PropTypes.func.isRequired,
    currentUser: CurrentUserPropType.isRequired,
    goals: PropTypes.arrayOf(GoalPropType).isRequired,
    logOut: PropTypes.func.isRequired,
    removeGoal: PropTypes.func.isRequired,
    updateGoal: PropTypes.func.isRequired,
  }

  render() {
    const { currentUser, goals, logOut } = this.props
    const logoutButton = (
      <IconButton onClick={logOut}>
        <Logout />
      </IconButton>
    )

    return (
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
                {goals.map((goal) => <GoalSetting goal={goal} key={goal.id} />)}
                {goals.length === 0 && (
                  <ListItem secondaryText="Aucun objectif pour le moment" />
                )}
              </List>
            </CardText>
            <CardActions>
              <RaisedButton
                icon={<ContentAdd />}
                label="Ajouter un objectif"
                primary
              />
            </CardActions>
          </Card>
        </div>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = ({ goals, currentUser }) => ({ goals, currentUser })

export default connect(mapStateToProps, {
  addGoal,
  logOut,
  removeGoal,
  updateGoal,
})(SettingsScreen)
