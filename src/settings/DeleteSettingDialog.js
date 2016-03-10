// Suppression de paramètre
// ========================

// C’est en fait une boîte de dialogue, inclue d’office dans
// le conteneur parent (`SettingsScreen`), et qui va donc être
// initialement *rendered* sans objectif (`goal`), puis verra ses
// propriétés mises à jour à chaque utilisation.  Mais comme c’est
// un composant pur fonctionnel, donc sans état aucun, nul besoin
// comme pour `AddSettingDialog` d’un `componentWillReceiveProps`.
// La fonction est simplement rappelée à chaque fois.  Nickel…

import PropTypes from 'prop-types'
import React from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import ContentClear from 'material-ui/svg-icons/content/clear'

import { GoalPropType } from '../shared/prop-types'

// Il y a vraiment quelque chose de délicieux dans la déstructuration,
// surtout pour un argument objet et en ajoutant des valeurs par défaut,
// comme ici…
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

// Sur un composant “bête”, préciser les propriétés attendues / autorisées est
// [une bonne pratique incontournable](http://facebook.github.io/react/docs/reusable-components.html).
// Quand on n’est pas dans une classe ES6 (et en effet, les composants purs fonctionnels
// sont le cas majoritaire), on colle juste la propriété `propTypes` directement sur la
// fonction (ça rend exactement pareil qu'une propriété `static` dans une classe ES6).
DeleteSettingDialog.propTypes = {
  goal: PropTypes.oneOfType([GoalPropType, PropTypes.shape({})]),
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default DeleteSettingDialog
