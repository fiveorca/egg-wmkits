'use strict';
const OsHttp = require('../../lib/oshttp');

// Http错误中间件
module.exports = () => async (ctx, next) => {
  ctx.oshttp = new OsHttp(ctx);
  await next(ctx);
};