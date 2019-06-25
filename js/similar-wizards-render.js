'use strict';

(function () {
  var WIZARDS_COUNT = 4;
  var userDialog = document.querySelector('.setup');
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var getArrayOfWizardsObjects = function (wizardsCount) {
    var wizards = [];
    for (var i = 0; i < wizardsCount; i++) {
      var wizardObJect = {
        name: window.util.getRandomArrayIndex(window.util.NAMES) + ' ' + window.util.getRandomArrayIndex(window.util.SURNAMES),
        coatColor: window.util.getRandomArrayIndex(window.util.COAT_COLOR),
        eyesColor: window.util.getRandomArrayIndex(window.util.EYES_COLOR)
      };
      wizards.push(wizardObJect);
    }
    return wizards;
  };
  var setWizardProperies = function (wizard) {
    var wizardElement = wizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };
  var wizardFragmentWrap = function (arrayOfWizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arrayOfWizards.length; i++) {
      fragment.appendChild(setWizardProperies(arrayOfWizards[i]));
    }
    return fragment;
  };
  var renderAllWizards = function (arrayOfWizardsObjects) {
    var similarWizardsList = userDialog.querySelector('.setup-similar-list');
    similarWizardsList.appendChild(wizardFragmentWrap(arrayOfWizardsObjects));
  };
  renderAllWizards(getArrayOfWizardsObjects(WIZARDS_COUNT));
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
})();
