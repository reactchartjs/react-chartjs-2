require('@babel/register')();

var canvas = require('canvas');

const jsdom = require('jsdom');

const { window } = new jsdom.JSDOM(`<!DOCTYPE html>`, { url: 'https://localhost' });

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
