'use strict';

const KITS = Symbol('Application#kits');
const ValidateUtil = require('../../lib/validate/validate');
const kits = require('../../lib/kits/index');

module.exports = {
  get wmkits() {
    if (!this[KITS]) {
      kits.validate = new ValidateUtil(this.config.wmkits.validate);

      this[KITS] = kits;
    }
    return this[KITS];
  },
};