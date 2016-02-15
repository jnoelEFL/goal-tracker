# Évolution de la codebase Goal Tracker

## 2.7.0 - 12/12/2017

### Améliorations

* Redécoupage des exercices (davantage, et pas les mêmes)
* Ajout des « devoirs du soir »
* Redécoupage de `src/` sur un mode fonctionnel (`auth/`, `history/`, `main/`, `settings/`, `shared/`) plutôt que technique (`components/`, `containers/`), qui tient mieux la rampe quand le volume de code/fichiers augmente.

### Divers / Outillage

* Ajout de [TypeScript Hero](https://marketplace.visualstudio.com/items?itemName=rbbit.typescript-hero) pour le formatage et le regroupement automatique des imports
* Ajout des configurations de lancement VSCode pour les débogages front et des tests
* Affinage configuration Prettier et VSCode
* Ajout de `FriendlyErrors` à la configuration Webpack
* Bascule de Surge à Netlify
* Mise à jour des dépendances (prod et dev) aux dernières versions.

## 2.6.0 - 20/10/2017

### Améliorations

* On recommande désormais [Visual Studio Code](https://code.visualstudio.com/), avec configuration et extensions recommandées intégrées
* La configuration ESLint a migré de « Standard + Import » à « ESLint Recommendé + React + Prettier », plus exigente. Du coup, `propTypes` systématiques, `key` systématiques, etc.
* Recours à [Prettier](https://github.com/prettier/prettier#readme) pour l'auto-formatage nickel à la sauvegarde
* Mise à jour pour [React 16](https://reactjs.org/) et Enzyme 3
* Les éléments Redux (reducers, action creators, constantes de type…) sont désormais structurés en fichiers sur le principe de l’architecture [Ducks](https://github.com/erikras/ducks-modular-redux#ducks-redux-reducer-bundles).
* Refactorisation de la configuration Webpack pour utiliser les meilleures pratiques de l’état de l’art (`webpack.parts.js` de configurations modulaires réutilisables, `webpack.config.js` unique sensible à l’environnement, etc.)

### Divers

* Exclusion du patcher Babel de React Hot Loader lors des builds de production
* Le `offline-plugin` de Webpack n’est activé que pour les builds de production
* Mise à jour des dépendances (prod et dev) aux dernières versions.

## 2.5.0 - 16/07/2017

### Améliorations

* Configuration centrale Jest (`package.json` et `jest/setup.js`)
* Harmonisation du _snapshot testing_ avec les assertions Chai en recourant à `chai-jest-snapshot` 1.3+ et `jest-serializer-enzyme`
* Passage à Webpack 3 et activation de son _scope hoisting_ pour le build
* Délégation du nettoyage de dossier cible à `clean-webpack-plugin`

### Divers

* Mise à jour des dépendances (prod et dev) aux dernières versions

## 2.4.0 - 16/06/2017

### Améliorations

* Passage à React-Hot-Loader 3 (en beta) au lieu de l'ancien React-HMRE
* Abandon de PouchDB au profit de `redux-offline` (certes encore « expérimental » mais tellement sympa…) avec `localForage` pour IndexedDB.

### Divers

* Retour à npm avec sa version 5, abandon de Yarn
* Passage à React 15.6
* Mise à jour des dépendances (prod et dev) aux dernières versions

## 2.3.0 - 16/04/2017

### Améliorations

* Passage à React-Router 4, avec un composant custom `PrivateRoute` pour du rendering exigeant l’authentification au sein du _store_ Redux.

### Divers

* Passage à Yarn
* Passage à React 15.5 (donc `PropTypes` à part, etc.)
* Mise à jour des dépendances (prod et dev) aux dernières versions

## 2.2.0 - 07/04/2017

### Améliorations

**Composants**

* Recours à des _propTypes_ plus avancés, soit issus de [airbnb-prop-types](https://github.com/airbnb/prop-types#readme), soit implémentés en interne.
* Fonctionnalité « rester ouvert » pour les ajouts en série d’objectifs.
* Simplification de la syntaxe `mapDispatchToProps` dans `SettingsScreen`.

** Redux, réducteurs et _action creators_ **

* L’exo d’implémentation du _reducer_ d’historisation recourt désormais à une spec Jest complète, fournie d’entrée de jeu, pour détecter que l’apprenant·e a réussi.
* Encapsulation des appels API par un petit _helper_ pour se concentrer sur l’asynchrone lors de l’étape 10, et simplification de la structure de code basée `async`/`await` dans l’_action creator_ `logIn`.

**Tests / Specs**

* Colocalisation des tests et du code testé (plutôt qu’un dossier `test/` avec tout dedans).
* Démo des snapshots Jest pour couvrir les détails secondaires des composants (et utilisation pour les composants non testés jusque-là)
* Exemples de tests des validateurs _propTypes_ personnalisés avec les tests de `HistoryDayGoal`.
* Recours à [Dirty Chai](https://github.com/prodatakey/dirty-chai#readme) pour éviter les fautes de frappes silencieuses et les avertissements StandardJS sur certaines assertions (ex. `calledOnce()`).
* Passage à Sinon 2.x et ses _sandboxes_ pour les _stubs_.
* Recours systématique au schéma `initialState` vs. `expectedState` dans les tests des _reducers_.
* Tests pour _tous_ les _reducers_

### Divers

* Extension de StandardJS pour ajouter des règles relatives aux imports/exports, en reprenant ESLint en direct avec les configs StandardJS comme base de travail.
* Mise à jour des dépendances (prod et dev) aux dernières versions, hors React-Router 4.
* Remplacement des "tricks" de déstructurations pour contourner les contraintes de déclarations multiples de StandardJS : on fait une constante par ligne, proprement, simplement.
* Utilisation de la constante globale à jour, plus spécifique, pour la connexion aux _Redux Dev Tools_ (`__REDUX_DEVTOOLS_EXTENSION__` plutôt que `devToolsExtension`)
* _Code splitting_ automatique du code _vendor_ par Webpack 2, pour tout code issu de `node_modules/`.

## 2.1.0 - 13/02/2017

* Passage à Webpack 2 (2.2.1)
* Layout de `TrackerScreen` à base de flexbox (enfin jetée, la `<table>` honteuse !)
* Tweaks des étapes des _reducers_ pour taper moins de _boilerplate_ et généraliser le _pattern_ « `initialState` / `expectedState` ».
* Ajout d’une case à cocher « Rester ouvert » pour le dialogue d’ajout d’objectif.
* Jest _snapshot testing_

## 2.0.0 - 13/01/2017

### Améliorations

* Webpack
  * passage à deux configurations manuelles (dev et prod) au lieu d’une config « automagique » générée par hjs-webpack. Permet une meilleure compréhension, et évolue plus facilement.
  * Parallélisation avec HappyPack
  * Mise en cache des transpilations Babel
* Serveur de dev personnalisé
  * Webpack intégré (_dev middleware_, _hot middleware_ et _dashboard_)
  * API de login avec un délai garanti de 500ms minimum (histoire de voir l’UI attendre un court instant)
  * _Deep linking_ (envoi du `index.html` pour toute requête sur URL inconnue)
* Nouvelles étapes intégrées
  * Login asynchrone (après l’avoir fait en synchrone), donc actions Redux asynchrones
  * Manifeste applicatif (axe PWA) et série d’icônes adaptés

### Divers

* Mise à jour des dépendances externes vers leurs dernières versions
* Retrait du hook de pre-commit automatique
* `favicon.ico` dérivé du nouvel icône (celui utilisé pour la PWA)
* Plus de fonction `loggedIn` dans `store` : on passe directement par l’examen de `currentUser.loginState`. Ça réduit les dépendances à `store`, ce qui facilitera à terme le _server-side rendering_.
* Code annoté directement dans la branche `master`, juste après la dernière étape (`finish`). Le dossier `doc` de la branche est tenu à jour, les apprenant·e·s n’ont donc pas besoin de le regénérer après récupération.

## 1.3.1 - 20/12/2016

### Améliorations

* Babel : Passage au preset `env` pour alléger le volume de transpilation en fonction de notre cible navigateurs.
* Babel : Plus besoin du _stage 2_, le _stage 3_ nous suffit.
* Standard : au lieu de décrire des globaux sortis de nulle part, on définit nos 3 environnements d'exécution : le navigateur, Node et Jest (meilleures pratiques)
* `AddSettingDialog` : plus de `bind` au sein du `render`
  (anti-pattern de performance) : on revient sur des fonctions fléchées et des appels explicites. Moins « magique » à la lecture, donc double avantage.
* Réducteurs : Simplification / rationalisation de la composition des _slice reducers_ et de nos réducteurs globaux à l’aide de `reduce-reducers`.

### Divers

* Mise à jour des dépendances externes vers leurs dernières versions
* Retrait de `test/mocha.opts` qui avait été oublié là lors du passage à Jest

## 1.3.0 - 30/11/2016

### Améliorations

* Tests : passage de Mocha + NYC à Jest, tout en gardant Enzyme et Chai en interne. Cela permet notamment :
  * Une UI plus agréable
  * Une exécution plus rapide des tests, car parallélisée
  * Un lancement plus ciblé des tests, notamment en mode _watch_
  * Un meilleur affichage des parties non couvertes dans les rapports de _coverage_
* `propTypes` plus étoffées
* Constructeurs des composants ES6 avec un passage explicite de tous les arguments (meilleures pratiques)
* Standardisation du recours à `DEFAULT_STATE` (après `AddSettingDialog`, `SettingsScreen`)
* `clock` : Unification des intervalles (`setInterval`…) utilisés
* Tests : Utilisation du plugin Sinon pour Chai
* Webpack : changement du type de sourcemap générée, pour retrouver une capacité de débogage / point d’arrêt opérationnelle dans Chrome.

### Divers

* Mise à jour massive des dépendances externes vers leurs dernières versions

## 1.2.6 - 21/11/2016

Renommage massif des fichiers de composants pour utiliser la même casse que la classe exportée (meilleures pratiques), ainsi que des fichiers de réducteurs pour utiliser celle de la fonction exportée

## 1.2.5 - 31/10/2016

### Améliorations

* Tâche `npm run start:d` qui enrobe `start` avec Webpack Dashboard, plus informatif
* Centralisation de l’interface Redux/PouchDB dans le seul fichier `store`

### Divers

* Retrait des _props_ `linkButton` qui restaient par oubli
* Retrait du réglage `https` pour le serveur de dev Webpack (jamais utilisé/nécessaire)

## 1.2.4 - 26/09/2016

### Améliorations

* Plus de dépendance à Lo-Dash : on préfère des ré-implémentations « functional JS » des 2 endroits qui s’en servaient, à base de `filter` et `find`
* `clock` : Simplification des comparaisons horaires
* _Namespacing_ des constantes de types d’actions Redux, en conformité avec les meilleures pratiques

### Divers

* Material UI 0.15 ne reconnaît / nécessite plus la _prop_ `linkButton` : on la vire

## 1.2.3 - 29/06/2016

### Améliorations

* `goals` (réducteur) : implémentation plus « functional JS » (basée `reduce`)

### Divers

* Mise à jour des dépendances externes vers leurs dernières versions.

## 1.2.2 - 12/05/2016

### Améliorations

* Tâche `npm run build` désormais garantie en `NODE_ENV=production`
* Fusion des tests des _action creators_ avec leurs réducteurs respectifs, dans l’esprit des meilleures pratiques recommandées par l’auteur de Redux.
* `favicon.ico` (icône Redux :wink:)

### Divers

* Mise à jour massive des dépendances externes vers leurs dernières versions. Cela a notamment entraîné :
  * Une ré-écriture complète des imports Material UI, qui avait changé de façon incompatible toute son arbo de fichiers composants :tired_face:
  * Certaines règles de StandardJS étaient apparues aussi, d’où divers reformatages (notamment la terminaison des balises JSX auto-fermantes)
  * L’ajustement de la fourniture des gestions d’historique pour le routage (React-Router 3 propose des singletons pour chaque type de gestion)

## 1.2.1 - 14/04/2016

### Améliorations

* Refactoring des réducteurs d’historisation et de la clé `today` pour les rendre plus similaires (en termes de structure fichiers) aux _slice reducers_

### Divers

* Changement de licence vers du No-License

## 1.2.0 - 19/03/2016

### Correctifs

* `AddSettingDialog` : ajout de `id: undefined` dans `DEFAULT_STATE` pour éviter qu’un ajout suite à une mise à jour abandonnée ne finalise—à tort, évidemment—cette mise à jour.

### Améliorations

* Tâche `npm run doc` utilisant Groc
* Tâche `npm run test:cov` pour la couverture de tests avec NYC / Istanbul
* Tâche `npm run deploy` pour le déploiement sur Surge.sh
* Codage couleur de `Gauge`
* Extraction des logiques `getCompletionRadio` et `getDayCounts` afin de les réutiliser dans les rappels périodiques
* `clock` : rappels périodiques
* Tests exhaustifs des _action creators_
* Tests exhaustifs (fournis) des _helpers_
* Plus de déstructurations pertinentes des arguments de méthodes
* Plus de recours pertinents aux valeurs par défaut sur les arguments de méthodes
* Pas d’import « en masse » de modules lourds : on préfère des imports ciblés pour faciliter à terme le _tree shaking_ (ex. codes couleurs de Material UI)
* Retrait du champ superflu `userName` dans l’état `currentUser`

### Divers

* Retrait des ressources de configuration Sublime Text 3

## 1.1.0 - 19/02/2016

### Correctifs

* `AddSettingDialog` : Restauration d’un état par défaut acceptable

### Améliorations

* Tags de début d’étape évitant aux apprenant la saisie du _boilerplate_ et des imports de modules tiers (notamment depuis Material UI)
* `clock` : Passage du déclenchement dev de l’historisation de 10’ à 20”
* `clock` : Restructuration du code de gestions des permissions de notifications web
* `SettingsScreen` : Restructuration de l’état local
* `goals` (reducteur et spec) : implémentation plus « functional JS »
* `GoalTrackerWidget` (spec) : passage d’une valeur de progrès à plusieurs valeurs-clés pour les tests
* `propTypes` plus étoffés
* Configuration TernJS du projet

### Divers

* Ajout de ressources de configuration Sublime Text 3

## 1.0.0 - 11/02/2016

Premier jet de la « version 2016 ».
