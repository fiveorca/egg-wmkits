'use strict';


/**
 * 工具类
 */
module.exports = class OsHttp {
  /**
   * 构造方法
   * @param {*} ctx 上下文对象
   */
  constructor(ctx) {
    this.ctx = ctx;
  }

  responseJson(datas, error_msg, error_code, http_status) {
    const result = {
      errorcode: error_code,
      errormessage: error_msg,
    };
    if (datas !== undefined) {
      result.data = datas;
    }
    this.ctx.status = http_status;
    this.ctx.body = result;

    return;
  }

  responseRawBody(http_body, http_status) {

    this.ctx.status = http_status;
    this.ctx.body = http_body;

    return;
  }

  successRaw(datas) {
    return this.responseRawBody(datas, 200);
  }

  success(datas) {
    return this.responseJson(datas, '', 0, 200);
  }


  error(error_msg, error_code, http_status = undefined) {
    if (http_status === undefined) {
      http_status = parseInt(String(error_code).substr(0, 3));
    }
    return this.responseJson(undefined, error_msg, error_code, http_status);
  }

  validate(rule, value) {

    return this.ctx.app.wmkits.validate.validate(rule, value);
  }

  request(rule) {
    let query, body, params, header, files = {};
    if (rule.query) {
      query = this.requestQuery(rule.query)
    }
    if (rule.body) {
      body = this.requestBody(rule.body)
    }
    if (rule.files) {
      files = this.requestFiles(rule.files)
    }
    if (rule.params) {
      params = this.requestParams(rule.params)
    }
    if (rule.header) {
      header = this.requestHeader(rule.header)
    }

    return { ...query, ...body, ...params, ...files, ...header }
  }

  requestBody(rule) {
    return this.validate(rule, this.ctx.request.body);
  }

  requestQuery(rule) {
    return this.validate(rule, this.ctx.query);
  }

  requestParams(rule) {
    return this.validate(rule, this.ctx.params);
  }

  requestHeader(rule) {
    return this.validate(rule, this.ctx.request.header);
  }

  requestFiles(rule) {
    const tmp = {}
    if (this.ctx.request.files) {
      const len = this.ctx.request.files.length;


      if (len > 0) {
        for (let i = 0; i < len; i++) {
          tmp[this.ctx.request.files[i].field] = this.ctx.request.files[i]
        }
      }
    }

    return this.validate(rule, tmp);
  }
}