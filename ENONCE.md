# Exercice 2 étape 14 : affichage correct du formulaire d’ajout / modification

Le formulaire d’ajout/modification ne se met pas à jour correctement : il reste vide. Nous avons vu que cela est dû au cycle de vie de `<AddSettingDialog/>` au sein de `<SettingsScreen/>`, et le squelette de cette méthode est prêt à remplir.

## Étapes

1. Assurez-vous que la demande de modification d’un objectif, en fournissant une _prop_ `goal` à jour à `<AddSettingDialog/>`, remplisse bien le formulaire.
2. Assurez-vous qu’une demande d’ajout d’objectif ultérieure à une demande de modification « réinitialise » bien le formulaire.

## Astuces

La syntaxe de _spread_ sur objets est votre amie. Et n’oubliez pas `DEFAULT_STATE`.

## Bonus

Pouvez-vous deviner pourquoi il est important que le `DEFAULT_STATE` de `<AddSettingDialog/>` précise `id: undefined` ? Si oui, testez le scénario dangereux en commentant cette propriété pour confirmer votre hypothèse.
