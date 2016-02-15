import autobind from 'autobind-decorator'
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
import Logout from 'material-ui/svg-icons/action/exit-to-app'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'

import { logOut } from '../reducers/currentUser'
import { addGoal, removeGoal, updateGoal } from '../reducers/goals'

class SettingsScreen extends Component {
  render() {
    return (
      <DocumentTitle title="Mes paramètres">
        <h1>Settings coming soon</h1>
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
