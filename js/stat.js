'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_POSITION_X = 100;
var CLOUD_POSITION_Y = 10;
var STEP = 5;
var SPACE_BETWEEN_TEXT_LINES = 20;
var CLOUD_COLOR = '#fff';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var TEXT = 'Ура вы победили!';
var TEXT_RESULTS_TITLE = 'Список результатов:';
var HISTOGRAM_HEIGHT = 150;
var HISTOGRAM_COLUMN_WIDTH = 40;
var HISTOGRAM_COLUMN_OFFSET = 50;

var renderCloud = function (ctx, color, x, y, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

var renderText = function (ctx, color, font, textBaseline, text, x, y) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textBaseline = textBaseline;
  ctx.fillText(text, x, y);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_SHADOW_COLOR, CLOUD_POSITION_X + STEP * 2, CLOUD_POSITION_Y + STEP * 2, CLOUD_WIDTH, CLOUD_HEIGHT);
  renderCloud(ctx, CLOUD_COLOR, CLOUD_POSITION_X, CLOUD_POSITION_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
  renderText(ctx, CLOUD_SHADOW_COLOR, '16px PT Mono', 'hanging', TEXT, CLOUD_POSITION_X + STEP * 4, CLOUD_POSITION_Y + STEP * 4);
  renderText(ctx, CLOUD_SHADOW_COLOR, '16px PT Mono', 'hanging', TEXT_RESULTS_TITLE, CLOUD_POSITION_X + STEP * 4, CLOUD_POSITION_Y + STEP * 4 + SPACE_BETWEEN_TEXT_LINES);
}
