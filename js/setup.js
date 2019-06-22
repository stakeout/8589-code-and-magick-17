'use strict';
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
var FIREBALL_COLOR = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];
var WIZARDS_COUNT = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var userDialog = document.querySelector('.setup');
var userAvatar = document.querySelector('.setup-open-icon');
var userDialogCloseBtn = userDialog.querySelector('.setup-close');
var userNameInputField = userDialog.querySelector('.setup-user-name');

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

// module-4
var userSetup = userDialog.querySelector('.setup-player');
var wizardEyes = userSetup.querySelector('.wizard-eyes');
var wizardCoat = userSetup.querySelector('.wizard-coat');
var wizardFireball = userSetup.querySelector('.setup-fireball-wrap');
var wizardCoatColorInput = userSetup.querySelector('input[name="coat-color"]');
var wizardEyesColorInput = userSetup.querySelector('input[name="eyes-color"]');
var wizardFireballColorInput = userSetup.querySelector('input[name="fireball-color"]');

var wizardCoatClickHandler = function () {
  var color = getRandomArrayIndex(COAT_COLOR);
  wizardCoat.style.fill = color;
  wizardCoatColorInput.value = color;
};

var wizardEyesClickHandler = function () {
  var color = getRandomArrayIndex(EYES_COLOR);
  wizardEyes.style.fill = color;
  wizardEyesColorInput.value = color;
};

var wizardFireballClickHandler = function () {
  var color = getRandomArrayIndex(FIREBALL_COLOR);
  wizardFireball.style.background = color;
  wizardFireballColorInput.value = color;
};

var popupPressEscHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var popupDefaultCoords = {
  x: null,
  y: null
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', popupPressEscHandler);
  userNameInputField.addEventListener('focus', function () {
    document.removeEventListener('keydown', popupPressEscHandler);
  });
  userNameInputField.addEventListener('blur', function () {
    document.addEventListener('keydown', popupPressEscHandler);
  });
  wizardCoat.addEventListener('click', wizardCoatClickHandler);
  wizardEyes.addEventListener('click', wizardEyesClickHandler);
  wizardFireball.addEventListener('click', wizardFireballClickHandler);
  popupDefaultCoords = {
    x: userDialog.offsetLeft,
    y: userDialog.offsetTop
  };
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', popupPressEscHandler);
  wizardCoat.removeEventListener('click', wizardCoatClickHandler);
  wizardEyes.removeEventListener('click', wizardEyesClickHandler);
  wizardFireball.removeEventListener('click', wizardFireballClickHandler);
  userDialog.style.left = popupDefaultCoords.x + 'px';
  userDialog.style.top = popupDefaultCoords.y + 'px';
};

userAvatar.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

userAvatar.addEventListener('click', openPopup);

userDialogCloseBtn.addEventListener('click', closePopup);

userDialogCloseBtn.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});
// module5
var setupHandler = userDialog.querySelector('.upload');
setupHandler.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  var dragged = false;
  var mouseMoveHandler = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };
    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
    userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
  };
  var mouseUpHandler = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
    if (dragged) {
      var clickPreventDefaultHandler = function (clickEvt) {
        clickEvt.preventDefault();
        setupHandler.removeEventListener('click', clickPreventDefaultHandler);
      };
      setupHandler.addEventListener('click', clickPreventDefaultHandler);
    }
  };
  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);
});
