// Configuration centrale de Jest, test par test
// =============================================

// Pseudo-polyfill RAF pour virer les warnings, recommandé par React

global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0)
}

// Enregistrement des plugins Chai génériques
// ------------------------------------------

const chai = require('chai')
// On aime bien faire nos snapshots Jest avec la syntaxe d’assertion Chai…
const chaiJestSnapshot = require('chai-jest-snapshot')
// [Enzyme](http://airbnb.io/enzyme/) est la super techno d’Airbnb pour tester
// à toute bombe des composants React.  Elle dispose même d’un plugin Chai pour
// avoir des assertions plus "métier".
const createChaiEnzyme = require('chai-enzyme')
// On aime bien les diffs JSON de Jest, alors on les restaure pour les assertions
// Chai type `.deep.equal`…
const createChaiJestDiff = require('chai-jest-diff').default
// On s’assure également qu’on peut (et doit, en fait) utiliser toutes les assertions
// comme des fonctions, même `.undefined`, `.true`, etc. et celles ajoutées par les
// plugins (ex. `.calledOnce`). Ainsi, au lieu d’un échec silencieux en cas de faute
// de frappe, on a une erreur franche.
const dirtyChai = require('dirty-chai')
// On termine avec des assertions métier sur les *spies* et *stubs* Sinon, type
// `.calledOnce()` ou `.calledWith(…)`.
const sinonChai = require('sinon-chai')

chai
  .use(chaiJestSnapshot)
  .use(createChaiEnzyme())
  .use(createChaiJestDiff())
  .use(sinonChai)
  .use(dirtyChai)

// Configuration de l’adaptateur Enzyme 3 / React 16

const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

Enzyme.configure({ adapter: new Adapter() })
