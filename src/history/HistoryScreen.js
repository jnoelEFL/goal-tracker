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

class HistoryScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    goals: PropTypes.arrayOf(GoalPropType).isRequired,
    history: PropTypes.arrayOf(HistoryDayStatsPropType).isRequired,
  }

  render() {
    return (
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
              <p>Coming soon: history</p>
            </CardText>
            <CardActions>
              <RaisedButton label="Réinitialiser" icon={<ClearIcon />} />
            </CardActions>
          </Card>
        </div>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = ({ goals, history }) => ({ goals, history })

export default connect(mapStateToProps)(HistoryScreen)
