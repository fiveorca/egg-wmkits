'use strict';

const { join } = require('path');
const assert = require('assert');
const fs = require('fs')

module.exports = app => {
    const { baseDir } = app.options;
    // 加载启动期工具模块
    app.loader.loadToApp(join(baseDir, 'app/rule'), 'rule');

    const const_dir = join(baseDir, 'app/const')

    if (fs.existsSync(const_dir)) {
        app.loader.loadToApp(const_dir, 'const');
    }

    if (app.config.wmkits.exception_handler) {
        const index = app.config.appMiddleware.indexOf('osexception');
        assert.equal(
            index,
            -1,
            'Duplication of middleware name found: osexception. Rename your middleware other than "osexception" please.'
        );
        app.config.coreMiddleware.unshift('osexception');
    }

    const index = app.config.appMiddleware.indexOf('oshttp');
    assert.equal(
        index,
        -1,
        'Duplication of middleware name found: oshttp. Rename your middleware other than "oshttp" please.'
    );
    app.config.coreMiddleware.unshift('oshttp');
};