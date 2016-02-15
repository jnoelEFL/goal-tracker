# Exercice étape 15 : finalisation du réducteur pour `CLOSE_DAY`

Le code principal de gestion de l'action `CLOSE_DAY` a déjà été mis en place. Il reste à produire la nouvelle entrée d'historique.

## Objectif

Produire les bonnes données pour le champ `progresses` de la nouvelle entrée d'historique.

## Étapes

1. Écrivez l'expression JS qui va calculer cette donnée.

## Astuces

Lancez si besoin un `npm run test:watch` : la spec dans `closeDay.spec.js` vous dira si vous avez bon (et vous rappellera ce qu'on attend concrètement).

Il s'agit de produire un objet, qui démarre à vide.  On examine alors chaque objectif et sa progression, et si celle-ci est supérieure à zéro, on complète l'objet résultat en utilisant l'ID d'objectif comme clé, et un tableau "progrès et cible actuelle" en valeur.

C'est clairement un `reduce` basé sur `goals`.  Pensez bien qu'un `reduce` doit *toujours* renvoyer la nouvelle valeur de l'accumulateur, même s'il ne l'a pas changée.

[Consultez la doc MDN FR de `reduce`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/reduce)
