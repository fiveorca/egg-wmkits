'use strict';

const error = require('../kits/error');
const Parameter = require('./parameter');

module.exports = class ValidateUtil {

  constructor(config = undefined) {

    this.validator = new Parameter(config);
    this.config = config

  }

  validate(rules, data) {

    const errs = this.validator.validate(rules, data);

    if (errs) {
      const len = errs.length;
      const error_msgs = [];
      if (len > 0) {
        for (let i = 0; i < len; i += 1) {
          const { field, message } = errs[i]
          error_msgs.push('`' + field + '`: ' + message);
        }

        let error_code = 400;
        if (this.config && this.config.error_code) {
          error_code = this.config.error_code
        }

        error.throwHttpError(error_msgs.join(';\n'), error_code);

      }
    }


    return data;
  }




};
