'use strict';

(function () {
  var load = function (successHandler, errorHandler) {
    var url = 'https://js.dump.academy/code-and-magick/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    if (xhr.status === 200) {
      successHandler(xhr.response);
    } else {
      errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
    }
    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s
    xhr.open('GET', url);

    xhr.addEventListener('load', function () {
      successHandler(xhr.response);
    });

    xhr.send();
  };
  var save = function (data, successHandler, errorHandler) {
    var url = 'https://js.dump.academy/code-and-magick';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    if (xhr.status === 200) {
      successHandler(xhr.response);
    } else {
      errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
    }

    xhr.open('post', url);
    xhr.send(data);
  };
  window.backend = {
    load: load,
    save: save
  };
})();
