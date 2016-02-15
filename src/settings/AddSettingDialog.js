import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import Checkbox from 'material-ui/Checkbox'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentEdit from 'material-ui/svg-icons/content/create'
import TextField from 'material-ui/TextField'

import { GoalPropType } from '../shared/prop-types'

const DEFAULT_STATE = {
  id: undefined,
  name: '',
  target: 5,
  units: '',
  keepOpen: true,
}

export default class AddSettingDialog extends Component {
  static propTypes = {
    goal: PropTypes.oneOfType([GoalPropType, PropTypes.shape({})]),
    onAdd: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  }

  constructor(...args) {
    super(...args)
    this.state = DEFAULT_STATE
  }

  componentWillReceiveProps(newProps) {
    // ???
  }

  handleChange(event, field, checked) {
    if (field === 'keepOpen') {
      this.setState({ keepOpen: checked })
    } else {
      const caster = field === 'target' ? Number : String
      this.setState({ [field]: caster(event.target.value) })
    }
  }

  render() {
    const { open, onCancel } = this.props
    const isEditing = 'id' in this.props.goal

    const actions = [
      <FlatButton label="Annuler" secondary onClick={onCancel} key="cancel" />,
    ]
    if (isEditing) {
      actions.push(
        <FlatButton
          icon={<ContentEdit />}
          key="edit"
          label="Modifier"
          onClick={this.triggerAdd}
          primary
        />
      )
    } else {
      actions.push(
        <FlatButton
          icon={<ContentAdd />}
          key="add"
          label="Ajouter"
          onClick={this.triggerAdd}
          primary
        />
      )
    }

    return (
      <Dialog
        actions={actions}
        onRequestClose={onCancel}
        open={open}
        title={isEditing ? 'Modifier un objectif' : 'Ajouter un objectif'}
      >
        <div>
          <TextField
            autoFocus
            floatingLabelText="Nom"
            fullWidth
            name="name"
            onChange={(event) => this.handleChange(event, 'name')}
            required
            value={this.state.name}
          />
          <TextField
            floatingLabelText="Quantité par jour"
            name="target"
            onChange={(event) => this.handleChange(event, 'target')}
            required
            type="number"
            value={this.state.target}
          />{' '}
          <TextField
            floatingLabelText="Unité"
            hintText="pas, minutes de course…"
            name="units"
            onChange={(event) => this.handleChange(event, 'units')}
            required
            value={this.state.units}
          />
          {isEditing || (
            <Checkbox
              checked={this.state.keepOpen}
              label="Garder ouvert pour l’ajout suivant"
              onCheck={(event, checked) =>
                this.handleChange(event, 'keepOpen', checked)
              }
              style={{ marginTop: '1em' }}
            />
          )}
        </div>
      </Dialog>
    )
  }

  @autobind
  triggerAdd() {
    this.props.onAdd(this.state)
    this.setState(DEFAULT_STATE)
  }
}
