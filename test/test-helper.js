if (typeof window === 'undefined') {
  require('babel/register');
  global.FoneroBase = require('../src/index');
  global.chai = require('chai');
  global.sinon = require('sinon');
  global.expect = global.chai.expect;
}
