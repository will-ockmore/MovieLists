import jsdom from 'jsdom';

process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';


const doc = jsdom.jsdom('<!doctype html><html><body><div id="root"></div></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

// hoist properties of window object to global node object, as in browser
Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

jest.mock('react-router');
