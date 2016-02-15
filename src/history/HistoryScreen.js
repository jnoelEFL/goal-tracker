import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import ClearIcon from 'material-ui/svg-icons/content/clear'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'

class HistoryScreen extends Component {
  render() {
    return <h1>History coming soon</h1>
  }
}

const mapStateToProps = ({ goals, history }) => ({ goals, history })

export default connect(mapStateToProps)(HistoryScreen)
