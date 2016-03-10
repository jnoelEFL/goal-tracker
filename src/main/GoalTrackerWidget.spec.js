// Suivi du jour pour un objectif (spec)
// =====================================
import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ContentAdd from 'material-ui/svg-icons/content/add'

import Gauge from '../shared/Gauge'
import GoalTrackerWidget from './GoalTrackerWidget'

// Classiquement, quand on décrit un composant React, on utilise sa balise JSX
// comme sujet de la description.  Celui-ci est censé…
describe('<GoalTrackerWidget />', () => {
  const goal = { id: 0, name: 'My goal', target: 42, units: 'wombats' }

  describe('when not completed', () => {
    // …produire le balisage attendu pour un objectif non atteint
    // ----------------------------------------------------------
    it('should render appropriately', () => {
      // On va tester quatre valeurs pour le taux de complétion: les “bornes” 0, 1 et 41,
      // d’une part, et une valeur quelconque, ici le 21 en plein milieu, d’autre part.
      for (const progress of [0, 1, 21, 41]) {
        // Le mode “shallow” d’Enzyme est adapté à tout test qui ne nécessite pas le
        // DOM réel mais peut se contenter du DOM virtuel, ce qui inclue même les simulations
        // d’événement.
        const wrapper = shallow(
          <GoalTrackerWidget goal={goal} progress={progress} />
        )

        // Vérification du contenu, ici grâce aux assertions métier fournies par le plugin
        // Chai d’Enzyme (`.text(…)`, `.contain(…)`).
        expect(wrapper.find('h2')).to.have.text(goal.name)
        expect(wrapper).to.contain(<Gauge value={progress} max={goal.target} />)
        expect(wrapper).to.contain.text(
          `${progress} ${goal.units} sur ${goal.target}`
        )
        expect(wrapper).to.contain(<ContentAdd />)
      }
    })

    // …déclencher correctement son `onProgress` au clic
    // -------------------------------------------------
    it('should trigger its onProgress on click', () => {
      const progress = 21
      // Pour vérifier que le *callback* transmis est bien appelé, rien de tel qu’un
      // *spy* fourni par [SinonJS](http://sinonjs.org/).
      const onProgress = sinon.spy()
      const wrapper = shallow(
        <GoalTrackerWidget
          goal={goal}
          onProgress={onProgress}
          progress={progress}
        />
      )

      // On simule le clic.  Merci Enzyme!
      wrapper.find('FloatingActionButton').simulate('click')
      // Ici, pouvoir appeler `calledOnce` comme une fonction
      // se fait grâce à l’application antérieure du plugin Dirty Chai.
      expect(onProgress)
        .to.have.been.calledOnce()
        .and.calledWith(goal)
    })

    // …valider le snapshot
    // --------------------
    // (avoir une structure détaillée identique à la dernière qui a été validée
    // par les développeurs au moyen d’un snapshot.)
    it('should otherwise match the expected snapshot', () => {
      const mock = sinon.useFakeTimers()
      try {
        const wrapper = shallow(<GoalTrackerWidget goal={goal} progress={21} />)

        expect(wrapper).to.matchSnapshot()
      } finally {
        mock.restore()
      }
    })
  })

  describe('when completed (or exceeded)', () => {
    // …produire le balisage attendu pour un objectif atteint (voire dépassé)
    // ----------------------------------------------------------------------
    it('should render appropriately', () => {
      // On va tester trois valeurs de dépassement de l’objectif: la borne zéro
      // (objectif atteint, pile-poil) et des plus grandes (objectif dépassé).
      for (const progress of [goal.target, goal.target + 1, goal.target + 10]) {
        const wrapper = shallow(
          <GoalTrackerWidget goal={goal} progress={progress} />
        )

        // Si on a atteint ou dépassé l'objectif, on n'est pas censé avoir l’icône d'ajout
        // qui trahirait un bouton de progression, mais on est censé avoir l’icône de pouce
        // vers le haut, qui traduit l’objectif (au moins) atteint.
        expect(wrapper).not.to.contain(<ContentAdd />)
        expect(wrapper).to.contain(<ActionThumbUp />)
      }
    })

    // …valider le snapshot
    // --------------------
    // (avoir une structure détaillée identique à la dernière qui a été validée
    // par les développeurs au moyen d’un snapshot.)
    it('should otherwise match the expected snapshot', () => {
      const mock = sinon.useFakeTimers()
      try {
        const wrapper = shallow(<GoalTrackerWidget goal={goal} progress={42} />)

        expect(wrapper).to.matchSnapshot()
      } finally {
        mock.restore()
      }
    })
  })
})
