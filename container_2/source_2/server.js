const express= require("express");
const { json } = require("express/lib/response");
const res = require("express/lib/response");
const app= express();
const fs = require('fs');
const winston = require('winston');
// const logger = winston.createLogger({
//     level: 'info',
//     format: winston.format.json(),
//     defaultMeta: { service: 'calculate-service' },
//     transports: [
//       //
//       // - Write all logs with importance level of `error` or less to `error.log`
//       // - Write all logs with importance level of `info` or less to `combined.log`
//       //
//       new winston.transports.File({ filename: 'error.log', level: 'error' }),
//       new winston.transports.File({ filename: 'combined.log' }),
//     ],
//   });
  
  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  // if (process.env.NODE_ENV !== 'production') {
  //   logger.add(new winston.transports.Console({
  //     format: winston.format.simple(),
  //   }));
  // }
const logger = require('./logger')

const add= (n1,n2) => {
    return n1+n2;
}

const sub = (n1,n2) => {
  if(n1>n2){
    return n1-n2;
  }

  if(n2>n1){
    return n2-n1;
  }
}

const mult = (n1, n2) => {
  return n1*n2;
}

const div = (n1,n2) => {
  return n1/n2;

}

const avg = (n1, n2) => {
  return (n1+n2)/2 
}

app.get("/add", (req,res)=>{
    try{
    const n1= parseFloat(req.query.n1);
    const n2=parseFloat(req.query.n2);
    
    if(isNaN(n1)) {
        logger.error("n1 is incorrectly defined");
        throw new Error("n1 incorrectly defined");
    }
    if(isNaN(n2)) {
        logger.error("n2 is incorrectly defined");
        throw new Error("n2 incorrectly defined");
    }
    
    if (n1 === NaN || n2 === NaN) {
        console.log()
        throw new Error("Parsing Error");
    }
    logger.info('Parameters '+n1+' and '+n2+' received for addition');

    //logger.warn(n1 + ' + ' + n2);
    //logger.log(n1 + '+' + n2);
    const result = add(n1,n2);
    fs.writeFile('operations.log', 'User input: '+ n1 +' + '+n2, function (error) {
      if(error)
        throw error
      console.log("Saved operation log") 
    });
    res.status(200).json({statusCode:200, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(500).json({statusCode:500, msg: error.toString() })
      }
});

app.get("/subtract", (req,res)=>{
  try{
  const n1= parseFloat(req.query.n1);
  const n2= parseFloat(req.query.n2);
  if(isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
  }
  if(isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
  }
  
  if (n1 === NaN || n2 === NaN) {
      console.log()
      throw new Error("Parsing Error");
  }
  logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for subtraction')
  fs.writeFile('operations.log', 'User input: '+n1+' - '+n2, function(error) {
    if (error)
    throw error
    console.log("Saved operation log")
  })
  const difference = sub(n1,n2);
  res.status(200).json({statusCode:200, data: difference}); 
  } catch(error) { 
      console.error(error)
      res.status(500).json({statusCode:500, msg: error.toString() })
    }
});


app.get("/multiply", (req,res)=>{
  try{
  const n1= parseFloat(req.query.n1);
  const n2= parseFloat(req.query.n2);
  if(isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
  }
  if(isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
  }
  
  if (n1 === NaN || n2 === NaN) {
      console.log()
      throw new Error("Parsing Error");
  }
  logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for multiply')
  fs.writeFile('operations.log', 'User input: '+n1+' * '+n2, function(error) {
    if (error)
    throw error
    console.log("Saved operation log")
  })
  const product = mult(n1,n2);
  res.status(200).json({statusCode:200, data: product}); 
  } catch(error) { 
      console.error(error)
      res.status(500).json({statusCode:500, msg: error.toString() })
    }
});


app.get("/divide", (req,res)=>{
  try{
  const n1= parseFloat(req.query.n1);
  const n2= parseFloat(req.query.n2);
  if(isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
  }
  if(isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
  }
  
  if (n1 === NaN || n2 === NaN) {
      console.log()
      throw new Error("Parsing Error");
  }
  logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for division')
  fs.writeFile('operations.log', 'User input: '+n1 +' / '+n2, function(error) {
    if (error) 
    throw error
    console.log("Saved Operation")
  } )
  const quotient = div(n1,n2);
  res.status(200).json({statusCode:200, data: quotient}); 
  } catch(error) { 
      console.error(error)
      res.status(500).json({statusCode:500, msg: error.toString() })
    }
});

app.get('/average', (req, res) => {
  try{
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    
    if(isNaN(n1)){
      logger.error("n1 is ill defined!")
      throw new Error("n1 is ill defined!")
    }

    if(isNaN(n2)){
      logger.error("n2 is ill defined!");
      throw new Error("n2 is ill defined!");
    }

    if(n1 === NaN || n2 === NaN){
      console.log();
      throw new Error("Parsing Error")
    }
    logger.info("Parameters " + n1 + " and " +n2+ " received for average function");
    fs.writeFile('operations.log', 'User input: '+ '('+n1+' + '+n2+')/2', function(error) {
      if (error)
      throw error
      console.log("Saved operation log")
    })
    const result_avg= avg(n1, n2);
    res.status(200).json({statusCode: 200, message: result_avg});

  }
  catch(error){
    console.error(error);
    res.status(500).json({statusCode: 500, msg: error.toString()})
  }
})

const port=3001;
app.listen(port,()=> {
    console.log("hello i'm listening to port " +port);
})