require('babel-register')();

const canvas = require('canvas');

const jsdom = require('jsdom');
const document = jsdom.jsdom();
const window = document.defaultView;

const canvasMethods = [
  'HTMLCanvasElement',
];

Object.keys(window).forEach(property => {
  if (typeof global[property] === 'undefined') {
    global[property] = window[property];
  }
});

canvasMethods.forEach(method =>
  global[method] = window[method]
);

global['CanvasRenderingContext2D'] = canvas.Context2d;

global.navigator = {
 userAgent: 'node.js'
};
