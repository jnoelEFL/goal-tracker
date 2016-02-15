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
    const { goals, history, dispatch } = this.props
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
              {history.map((dayStats) => (
                <HistoryDay
                  key={dayStats.date}
                  goals={goals}
                  stats={dayStats}
                />
              ))}
              {history.length === 0 && <p>Aucun historique disponible</p>}
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

const mapStateToProps = ({ goals, history }) => ({ goals, history })

export default connect(mapStateToProps)(HistoryScreen)
