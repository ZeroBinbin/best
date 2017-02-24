// Learn more on how to config.
// - https://github.com/dora-js/dora-plugin-proxy#规则定义

const mock = {};
require('fs').readdirSync(require('path').join(__dirname + '/model'))
    .forEach(function (file) {
        if (!/(.*)\.json$/.test(file)) return;
        let key = file.match(/(.*)\.json$/)[1].trim().replace(/_/g, "/");
        let content = require('./model/' + file);
        let model = {};
        model[`/${key}`] = function (req, res) {
            res.json(content)
        }
        Object.assign(mock, model);
    });
require('fs').readdirSync(require('path').join(__dirname + '/mock'))
    .forEach(function (file) {
        Object.assign(mock, require('./mock/' + file));
    });
module.exports = mock;
