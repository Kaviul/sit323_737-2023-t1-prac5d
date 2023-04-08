const buildProdLogger = require('./productionLogger')
const buildDevLogger = require('./devLogger');
//const consoleProdLogger = require('./productionLogger')
const winston = require('winston')

var logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculate-service' },
    //message: `New operation requested: ${n1} operation ${n2}` 
  });

  // const consoleLogger = winston.createLogger({
  //   level: 'info',
  //   format: winston.format.json(),
  //   defaultMeta: { service: "user"}
  // });

  
if(process.env.NODE_ENV === 'development'){
    logger = buildDevLogger();
} else {
    logger = buildProdLogger();
   // logger = consoleProdLogger();
}

module.exports = logger;
