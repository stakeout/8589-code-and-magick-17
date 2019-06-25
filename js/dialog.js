'use strict';
(function () {

  var userDialog = document.querySelector('.setup');
  var userAvatar = document.querySelector('.setup-open-icon');
  var userDialogCloseBtn = userDialog.querySelector('.setup-close');
  var userNameInputField = userDialog.querySelector('.setup-user-name');
  var userSetup = userDialog.querySelector('.setup-player');
  var wizardEyes = userSetup.querySelector('.wizard-eyes');
  var wizardCoat = userSetup.querySelector('.wizard-coat');
  var wizardFireball = userSetup.querySelector('.setup-fireball-wrap');
  var wizardCoatColorInput = userSetup.querySelector('input[name="coat-color"]');
  var wizardEyesColorInput = userSetup.querySelector('input[name="eyes-color"]');
  var wizardFireballColorInput = userSetup.querySelector('input[name="fireball-color"]');

  var wizardCoatClickHandler = function () {
    var color = window.util.getRandomArrayIndex(window.util.COAT_COLOR);
    wizardCoat.style.fill = color;
    wizardCoatColorInput.value = color;
  };

  var wizardEyesClickHandler = function () {
    var color = window.util.getRandomArrayIndex(window.util.EYES_COLOR);
    wizardEyes.style.fill = color;
    wizardEyesColorInput.value = color;
  };

  var wizardFireballClickHandler = function () {
    var color = window.util.getRandomArrayIndex(window.util.FIREBALL_COLOR);
    wizardFireball.style.background = color;
    wizardFireballColorInput.value = color;
  };

  var popupPressEscHandler = function (evt) {
    window.util.isEscEvent(evt, closePopup);
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
    window.util.isEnterEvent(evt, openPopup);
  });

  userAvatar.addEventListener('click', openPopup);

  userDialogCloseBtn.addEventListener('click', closePopup);

  userDialogCloseBtn.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });
})();
