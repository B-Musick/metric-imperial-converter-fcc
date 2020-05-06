/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.get('/api/convert',(req, res)=>{
      var input = req.query.input;
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      // Validates inputs or send back response with error.
      if (!initNum && !initUnit) {return res.json('invalid number and unit');}
      else if (initNum===null) { return res.json('no number'); }
      else if (!initNum) {return res.json('invalid number');}
      else if (!initUnit) {return res.json('invalid unit');}
      else{
        // If no errors then continue to get the results of conversion
        var returnNum = convertHandler.convert(initNum, initUnit);
        var returnUnit = convertHandler.getReturnUnit(initUnit);
        var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
        // Return JSON to be able to access values from res.body.key
        res.json(toString);
      }
    });
    
};
