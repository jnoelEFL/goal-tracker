// Jauge (spec)
// ============
import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'

import Gauge from './Gauge'

// Le mode “shallow” d’Enzyme est adapté à tout test qui ne nécessite pas le
// DOM réel mais peut se contenter du DOM virtuel, ce qui inclue même les simulations
// d’événement.
// Classiquement, quand on décrit un composant React, on utilise sa balise JSX
// comme sujet de la description.  Celui-ci est censé…
describe('<Gauge />', () => {
  // …produire le composant attendu
  // ------------------------------
  it('should render appropriately', () => {
    // Hop!  Production de l’enrobage de test à base de DOM virtuel pour notre composant.
    const wrapper = shallow(<Gauge value={50} />)

    // Utilisation d’une assertion métier du plugin: `prop`, qui teste la présence, voire
    // la valeur, d’une *prop* au sens React.
    expect(wrapper).to.have.prop('mode', 'determinate')
    expect(wrapper).to.have.prop('max', 100)
    expect(wrapper).to.have.prop('value', 50)
    // Comme les assertions de valeur de *prop* sont de simples égalités strictes
    // (`===`), elles ne suffisent pas pour des objets.  On récupère alors la valeur
    // telle quelle et on utilise une comparaison profonde standard de Chai.
    expect(wrapper)
      .to.have.prop('style')
      .that.deep.equals({ height: 8 })
  })

  // …gérer sa *prop* optionnelle `max`
  // ----------------------------------
  it('should honor custom max', () => {
    const wrapper = shallow(<Gauge value={50} max={75} />)

    expect(wrapper).to.have.prop('max', 75)
  })

  // …valider le snapshot
  // --------------------
  // (avoir une structure détaillée identique à la dernière qui a été validée
  // par les développeurs au moyen d’un snapshot.)
  it('should otherwise match the expected snapshot', () => {
    const now = new Date(Date.UTC(2017, 11, 12, 12, 0, 0, 0))
    const wrapper = shallow(<Gauge value={50} now={now} />)

    expect(wrapper).to.matchSnapshot()
  })
})
