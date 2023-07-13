/* eslint valid-jsdoc: "off" */

'use strict';
const { env } = require('process');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1686028206442_1743';

  // 关闭CSRF
  config.security = { csrf: { enable: false } };

  // 开启CORF
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.wmkits = {
    exception_handler: true,
  };

  // 配置ORM主库
  config.sequelize = {
    dialect: 'mysql',
    database: env.DB_NAME,
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWD,
    operatorsAliases: false,
    seederStorage: 'sequelize',
    migrationStorageTableName: 'sequelize_meta',
    seederStorageTableName: 'sequelize_data',
    timezone: '+08:00',
  };

  // 日志答应级别
  config.logger = {
    level: 'DEBUG',
    allowDebugAtProd: true,
    consoleLevel: 'DEBUG',
    disableConsoleAfterReady: false,
  };


  return config;
};
