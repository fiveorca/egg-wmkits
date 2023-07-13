'use strict';

const _ = require('lodash');
//常见数据类型的数据的校验，处理，生成
const uuid = require('uuid');


module.exports.isPositiveInteger = (val, strict = false) => {

  if (this.isInteger(val, strict) && val >= 1) {
    return true;
  }
  return false;
}


module.exports.isNaturalNum = (val, strict = false) => {

  if (this.isInteger(val, strict) && val >= 0) {
    return true;
  }
  return false;
}

module.exports.isInteger = (val, strict = false) => {
  if (strict) {
    return _.isInteger(val)
  }
  const reg = /^([0-9]*|-[0-9]*|\+[0-9]*)$/;
  if (reg.test(val)) {
    return true;
  }
  return false;
}

module.exports.isAlpha = val => {
  const reg = /^[A-Z]+$/i;
  if (reg.test(val)) {
    return true;
  }
  return false;
}

module.exports.getFileName = (path, has_extend = true) => {
  const split = path.split("/");
  const len = split.length;
  if (len > 0) {
    let result = split[split.length - 1];
    if (!has_extend) {
      result = result.replace('.' + this.getFileSuffixType(result), '');
    }

    return result;

  } else {
    return path;
  }
}

module.exports.getFileSuffixType = val => {
  return val.substring(val.lastIndexOf('.') + 1);
}

module.exports.arrayDifference = (arr1, arr2) => {
  return _.difference(arr1, arr2);
}

module.exports.isArray = val => {
  return _.isArray(val);
}

module.exports.uuid = () => {
  return uuid.v4()
}