# Exercice étape 9 : montée des objectifs dans TrackerScreen

Vous devez implémenter le fonctionnement des boutons "+" dans l’écran principal.

# Astuces

* Votre composant est connecté : il a déjà une _prop_ `dispatch()`, que vous pouvez utiliser.
* Vous aurez besoin du _action creator_ adéquat, à importer depuis le fichier de réducteur approprié.
* Les `<GoalSetting/>` ont une _prop_ `onProgress`, vous vous souvenez ? Elle prend une fonction qui recevra l’ID de l’objectif en argument. Faite une méthode métier que vous pourrez passer en valeur à cette _prop_.
* Attention, vous aurez besoin de garantir le `this` sur cette méthode métier, pour pouvoir accéder à `this.props.dispatch(…)`.
* Dès que vous utiliserez cette _prop_, le linter exigera sa déclaration dans les `propTypes`, pensez-y !
