const path = require('path')
const warnFormat =
    '[{{title}}] {{timestamp}} {{message}} (in {{path}} {{file}}:{{line}})'
const errorFormat =
    '[{{title}}] {{timestamp}} {{message}} (in {{path}} {{file}}:{{line}})\nCall Stack:\n{{stack}}'
const conf = {
    format: [
        '[{{title}}]{{timestamp}}\t{{message}}\t(in {{file}}:{{line}})',

        {
            log: '{{timestamp}}\t{{message}}\t(in {{file}}:{{line}})',
            warn: warnFormat,
            error: errorFormat,
            fatal: errorFormat
        }
    ],
    dateformat: 'HH:MM:ss.L'
}
module.exports = function(logPath = './logs', maxFiles = 30, level = 'warn', env = 'development') {
    return env !== 'production' ? require('tracer').colorConsole(conf) : require('tracer').dailyfile({
        root: path.resolve(path.dirname(require.main.filename), logPath),
        maxLogFiles: maxFiles,
        format: [
            '[{{title}}]{{timestamp}} {{message}} (in {{file}}:{{line}})',
            {
                warn: warnFormat,
                error: errorFormat,
                fatal: errorFormat
            }
        ],
        dateformat: 'yyyy-mm-dd HH:MM:ss.L o',
        level: level
    })
}