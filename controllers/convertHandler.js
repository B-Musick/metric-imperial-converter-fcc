/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getNum = function(input) {
    // Get the number from the query 'input=4gal' or 'input=4.1/2.4km'

    // Check that only one divisor is used
    let checkDivisions = input.split('').filter(letter => letter === '/');

    // Use to determine if it is a valid number (checkintegers.length === 0 then not)
    let checkIntegers = input.split('').map(letter=> parseFloat(letter)).filter(letter=>letter);

    // Check that multiple divisors arent used
    if (checkDivisions.length > 1) { return false; }

    // Check that there are even integers
    if (checkIntegers.length === 0){ return null; }
    
    let result; // Holds the result

    if(checkDivisions.length===1){
      // If there is a division to perform
      result = input.match(/\d+[.]*[0-9]*[/]*\d+[.]*[0-9]*/).pop();
      // Split the numerator and denominator into an array
      let newResult = result.split('/');
      // Perform the division
      let returnResult = parseFloat(newResult[0])/parseFloat(newResult[1]);
      return returnResult;
    }else{
      // If a single whole or integer number then match the following
      result = input.match(/\d+[.]*[0-9]*/).pop()
      return parseFloat(result);
    };
  };
  
  this.getUnit = function(input) {
    let units = {
      'kg': 'lbs',
      'lbs': 'kg',
      'mi': 'km',
      'km': 'mi',
      'gal': 'l',
      'l': 'gal'
    }
    // Match the unit passed
    var result = input.match(/[a-z]+/i);

    let unit; // Holds the unit found

    // Check if there is a unit given
    if(result){
      // If unit given then take it and put it to lower case
      unit = result.pop().toLowerCase();
    }else return false;
    
    let finalResult; 

    // Check for valid unit
    if (Object.keys(units).includes(unit)) {
      // If valid unit in the object
      if(unit==='l'){
        // If litre then want it uppercase for rest of the functions
        finalResult = unit.toUpperCase();
      }else{
        // Otherwise keep it lowercase
        finalResult = unit;
      }
    }else {
      // If not a valid unit then return false so json can be returned in api/convert route 'invalid unit'
      finalResult = false;
    }
    
    return finalResult;
  };
  
  this.getReturnUnit = function(initUnit) {
    // Function is called if a valid unit is given
    let units = {
      'kg':'lbs',
      'lbs':'kg',
      'mi': 'km',
      'km': 'mi',
      'gal': 'L',
      'L': 'gal'
    }

    var result;
    result = units[initUnit];
    return result;
  };

  this.spellOutUnit = function(unit) {
    // Called in the toString to spell out the units
    let longForm = {
      'km': 'kilometers',
      'mi': 'miles',
      'L': 'litres',
      'gal': 'gallons',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    
    var result = longForm[unit]; // Find associated unit
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    // USED FOR CONVERSIONS
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result; // FINAL RESULT

    // Take the unit, then take associated value and return the associated conversion
    if (initUnit === 'gal') result = initNum * galToL;
    if (initUnit === 'L') result = initNum / galToL;
    if (initUnit === 'lbs') result = initNum * lbsToKg;
    if (initUnit === 'kg') result = initNum / lbsToKg;
    if (initUnit === 'mi') result = initNum * miToKm;
    if (initUnit === 'km') result = initNum / miToKm;

    // To round to 5 decimal places
    return Math.round(result*100000)/100000;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    // This will return object which res.json(toString) calls in api/convert route
    // so can access in the req.body of the response and get associated values (res.body.initNum, etc...) 
    let initialUnit = this.spellOutUnit(initUnit);
    let returnUnits = this.spellOutUnit(returnUnit);
    var result = {initNum, initUnit, returnNum, returnUnit, string: initNum+' '+ initialUnit+ ' converts to '+returnNum +' '+ returnUnits};
    
    return result;
  };
  
}

module.exports = ConvertHandler;
