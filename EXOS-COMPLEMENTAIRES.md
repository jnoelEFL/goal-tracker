# Exercices complémentaires

## À partir de l’étape 3 : mettre en place un layout

* Ajouter un composant pur `<Layout />` et sa feuille de style, qui encadrera le contenu principal par un en-tête et un pied de page
* L’utiliser dans `<App />`, autour du cœur de contenu (à la base, `<HomeScreen />`)

## À partir de l’étape 13 : autoriser les jauges sans code couleur

* Ajouter une prop `useColor` à `<Gauge />`, qui est à `true` par défaut mais doit pouvoir être mise à `false`.
* Si elle est `false`, ne pas définir de _prop_ `color` sur le `<LinearProgress/>` à l’intérieur de `<Gauge/>`
* Ajouter le test qui valide cet aspect
* Pensez à déclarer la nouvelle _prop_ dans `propTypes` !
