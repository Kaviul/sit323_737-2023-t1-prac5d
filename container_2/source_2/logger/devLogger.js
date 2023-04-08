const winston = require('winston')
const {format, createLogger, transports} = require('winston');
const {timestamp, combine, printf} = format;

function buildDevLogger() {
    const logFormat = printf(({level, message, timestamp, stack}) => {
        return `${timestamp} ${level}: ${stack || message}`;
    });

    return createLogger({
        format: combine(timestamp({format: 'YYYY-MM-DD HH:mm:ss' }), format.errors({ stack: true})),
        defaultMeta: { service: 'developer-service'},
        transports: [new winston.transports.File({ filename: 'development.log', level: 'info'}),
        new winston.transports.File({filename: 'dev-error.log', level: 'error'})],
    })
}

module.exports = buildDevLogger;