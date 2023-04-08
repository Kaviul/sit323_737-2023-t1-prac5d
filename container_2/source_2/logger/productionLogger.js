const winston = require('winston')
const {format, createLogger, transports} = require('winston')
const {timestamp, combine, errors, json} = format;

function buildProdLogger() {
    return createLogger({
        format: combine( timestamp(), errors({stack: true}), json()),
        defaultMeta: { service: 'user-service'},
        transports: [new winston.transports.File({filename: 'production.log', level: 'info'}),
        new winston.transports.File({filename: 'prod-error.log', level: 'error'})
    ]
    }); 
}

// function consoleProdLogger() {
//     return createLogger({
//         format: combine( timestamp(), errors({stack: true}), json()),
//         defaultMeta: { service: 'user'},
//         transports: [new winston.transports.File({ filename: 'console.log', level: 'info'}),
//         new winston.transports.File({filename: 'console-error.log', level: 'error'}),
//     ]
//     }); 
// }


//  function methodProdLogger(){

//  }

module.exports = buildProdLogger; 