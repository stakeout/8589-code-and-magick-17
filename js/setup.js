'use strict';
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_COUNT = 4;

var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomArrayIndex = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getArrayOfWizardsObjects = function (wizardsCount) {
  var wizards = [];
  for (var i = 0; i < wizardsCount; i++) {
    var wizardObJect = {
      name: getRandomArrayIndex(NAMES) + ' ' + getRandomArrayIndex(SURNAMES),
      coatColor: getRandomArrayIndex(COAT_COLOR),
      eyesColor: getRandomArrayIndex(EYES_COLOR)
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
