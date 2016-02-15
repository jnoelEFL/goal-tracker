# Exercice étape 13 : finaliser `HistoryScreen`

Le squelette de l’écran d’historique est déjà prêt dans `HistoryScreen.js` : il déclare le composant, fait une bonne partie du `render`, définit sa connexion à l’état global applicatif et met donc à disposition les *props* `dispatch`, `goals` et `history`.

## Objectifs

1. Faites en sorte d’afficher correctement l’historique, sans erreurs ni avertissements dans la console du navigateur.
2. Faites que le bouton Réinitialiser déclenche l’effacement de l’historique.

## Étapes

1. Déstructurez les propriétés dont vous aurez besoin au début de `render`
2. Remplacez tout le paragraphe "Coming soon…" par une expression JSX porteuse du `map` adéquat. N'oubliez pas de transmettre une *prop* `key` stable et unique à chaque `HistoryDay` !
3. Implémentez le `onClick` du `RaisedButton`

## Astuces

Le composant `HistoryDay` est déjà prêt, et importé dans le module.

Regardez le `propTypes` de `HistoryDay` pour savoir quelles *props* lui passer. La *prop* `stats` a une structure bien familière, non ?

L'*action creator* `clearHistory()` est déjà importé aussi, prêt à servir.
