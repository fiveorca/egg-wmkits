'use strict';

class OsHttpError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'OsHttpError';
    this.code = code;
    // 这一步可不写，默认会保存堆栈追踪信息到自定义错误构造函数之前，
    // 而如果写成 `Error.captureStackTrace(this)` 则自定义错误的构造函数也会被保存到堆栈追踪信息
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports.throwHttpError = (message, code) => {

  throw new OsHttpError(message, code);
}

