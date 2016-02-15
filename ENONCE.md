# Exercice étape 3 : convertir <Gauge /> pour qu’il puisse être pur

Lors de nos tests, nous avons dû simuler le temps afin de permettre le _snapshotting_ de `<Gauge/>`. Ajoutons une _prop_ indiquant le moment de référence, qui sera par défaut l’instant courant, afin de pouvoir contrôler cet aspect lors des tests.

# Étapes

1. Ajouter à `<Gauge/>` une _prop_ `now`, optionnelle et valant par défaut `new Date()` (attention, cette valeur ne pourra pas être définie dans `defaultProps`. Pourquoi ?)
2. Utiliser cette _prop_ au sein de `<Gauge/>` pour calculer le code couleur (il vous faudra faire évoluer `gaugeColor()`)
3. Dans les tests de `<Gauge/>`, utiliser un moment précis, par exemple midi UTC à une date donnée, à l’aide par exemple du constructeur `new Date()` et de `Date.UTC()`. Retirez la simulation du temps.
4. Mettez à jour le snapshot de référence ; vérifiez que les snapshots suivants fonctionnent bien.
