'use strict';

const error = require('./error');
const crypto = require('./crypto');
const others = require('./others');

module.exports = {
    ...error,
    ...others,
    ...crypto,
}