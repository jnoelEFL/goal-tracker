import PropTypes from 'prop-types'
import React from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import ContentClear from 'material-ui/svg-icons/content/clear'

import { GoalPropType } from '../shared/prop-types'

const DeleteSettingDialog = ({ goal = {}, onCancel, onDelete, open }) => {
  const actions = [
    <FlatButton
      key="cancel"
      keyboardFocused
      label="Ouh là, non !"
      onClick={onCancel}
      secondary
    />,
    <FlatButton
      icon={<ContentClear />}
      key="delete"
      label="Adios !"
      onClick={onDelete}
      primary
    />,
  ]

  return (
    <Dialog
      actions={actions}
      onRequestClose={onCancel}
      open={open}
      title="Supprimer un objectif"
    >
      <p>Supprimer l’objectif « {goal.name} » ?</p>
    </Dialog>
  )
}

DeleteSettingDialog.propTypes = {
  goal: PropTypes.oneOfType([GoalPropType, PropTypes.shape({})]),
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default DeleteSettingDialog
