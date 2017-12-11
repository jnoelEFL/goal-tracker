import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import HistoryIcon from 'material-ui/svg-icons/action/history'
import SettingsIcon from 'material-ui/svg-icons/action/settings'

import './TrackerScreen.styl'

import { formatDate, getDayCounts } from '../lib/helpers'
import { progressOnGoal } from '../reducers/todaysProgress'
import Gauge from '../shared/Gauge'
import { GoalPropType, TodaysProgressPropType } from '../shared/prop-types'
import GoalTrackerWidget from './GoalTrackerWidget'

export class TrackerScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    goals: PropTypes.arrayOf(GoalPropType).isRequired,
    today: PropTypes.string.isRequired,
    todaysProgress: TodaysProgressPropType.isRequired,
  }

  @autobind
  markGoalProgression({ id }) {
    this.props.dispatch(progressOnGoal(id))
  }

  overallProgress() {
    const { goals, todaysProgress } = this.props
    const [totalProgress, totalTarget] = getDayCounts(todaysProgress, goals)

    return totalTarget === 0 ? 0 : Math.floor(totalProgress * 100 / totalTarget)
  }

  render() {
    const { goals, today, todaysProgress } = this.props
    return (
      <Card className="goalTracker">
        <CardTitle
          subtitle={<Gauge value={this.overallProgress()} />}
          title={formatDate(today, 'LL')}
        />
        <CardText>
          {goals.map((goal) => (
            <GoalTrackerWidget
              goal={goal}
              key={goal.id}
              onProgress={this.markGoalProgression}
              progress={todaysProgress[goal.id] || 0}
            />
          ))}
        </CardText>
        <CardActions>
          <RaisedButton label="Historique" secondary icon={<HistoryIcon />} />
          <RaisedButton label="Paramètres" icon={<SettingsIcon />} />
        </CardActions>
      </Card>
    )
  }
}

const mapStateToProps = ({ goals, today, todaysProgress }) => ({
  goals,
  today,
  todaysProgress,
})

export default connect(mapStateToProps)(TrackerScreen)
