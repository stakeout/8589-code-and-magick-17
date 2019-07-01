'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_POSITION_X = 100;
  var CLOUD_POSITION_Y = 10;
  var STEP = 10;
  var SPACE_BETWEEN_TEXT_LINES = 20;
  var CLOUD_COLOR = '#fff';
  var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
  var TEXT = 'Ура вы победили!';
  var TEXT_RESULTS_TITLE = 'Список результатов:';
  var HISTOGRAM_HEIGHT = 150;
  var HISTOGRAM_COLUMN_WIDTH = 40;
  var HISTOGRAM_COLUMN_OFFSET = 50;
  var USER_BG_COLOR = 'rgba(255, 0, 0, 1)';
  var renderCloud = function (ctx, color, x, y, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  };
  var renderText = function (ctx, color, font, textBaseline, text, x, y) {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textBaseline = textBaseline;
    ctx.fillText(text, x, y);
  };
  var getBlueShade = function () {
    return 'rgba(0, 0, 255, ' + Math.random().toFixed(2) + ')';
  };
  var getMaxElementOfArray = function (array) {
    var maxElement = array[0];
    for (var i = 1; i < array.length; i++) {
      if (maxElement < array[i]) {
        maxElement = array[i];
      }
    }
    return Math.floor(maxElement);
  };
  var renderBar = function (ctx, color, name, time, index, barHeight, x) {
    var positionX = x + HISTOGRAM_COLUMN_OFFSET + (HISTOGRAM_COLUMN_WIDTH + HISTOGRAM_COLUMN_OFFSET) * index;
    ctx.fillStyle = color;
    ctx.fillRect(positionX, CLOUD_HEIGHT - barHeight - STEP * 2, HISTOGRAM_COLUMN_WIDTH, barHeight);
    ctx.fillStyle = CLOUD_SHADOW_COLOR;
    ctx.fillText(name, positionX, CLOUD_HEIGHT - STEP);
    ctx.fillText(time, positionX, CLOUD_HEIGHT - barHeight - STEP * 4);
  };
  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_SHADOW_COLOR, CLOUD_POSITION_X + STEP, CLOUD_POSITION_Y + STEP, CLOUD_WIDTH, CLOUD_HEIGHT);
    renderCloud(ctx, CLOUD_COLOR, CLOUD_POSITION_X, CLOUD_POSITION_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
    renderText(ctx, CLOUD_SHADOW_COLOR, '16px PT Mono', 'hanging', TEXT, CLOUD_POSITION_X + STEP * 2, CLOUD_POSITION_Y + STEP * 2);
    renderText(ctx, CLOUD_SHADOW_COLOR, '16px PT Mono', 'hanging', TEXT_RESULTS_TITLE, CLOUD_POSITION_X + STEP * 2, CLOUD_POSITION_Y + STEP * 2 + SPACE_BETWEEN_TEXT_LINES);
    var maxPlayerTime = getMaxElementOfArray(times);
    for (var i = 0; i < names.length; i++) {
      var barHeight = HISTOGRAM_HEIGHT * times[i] / maxPlayerTime;
      var barColor = names[i] === 'Вы' ? USER_BG_COLOR : getBlueShade();
      renderBar(ctx, barColor, names[i], Math.floor(times[i]), i, barHeight, CLOUD_POSITION_X);
    }
  };
})();
