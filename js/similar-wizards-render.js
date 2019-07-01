'use strict';

(function () {
  var WIZARDS_COUNT = 4;
  var userDialog = document.querySelector('.setup');
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var setWizardProperies = function (wizard) {
    var wizardElement = wizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };
  var wizardFragmentWrap = function (arrayOfWizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARDS_COUNT; i++) {
      fragment.appendChild(setWizardProperies(arrayOfWizards[i]));
    }
    return fragment;
  };
  var successHandler = function (wizards) {
    var similarWizardsList = userDialog.querySelector('.setup-similar-list');
    similarWizardsList.appendChild(wizardFragmentWrap(wizards));
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  window.backend.load(successHandler, errorHandler);

  var form = userDialog.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), function (response) {
      userDialog.classList.add('hidden');
    }, errorHandler);
  });
})();
