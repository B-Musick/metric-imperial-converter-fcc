/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      var input = '3.1L';
      assert.equal(convertHandler.getNum(input),3.1);
      done();
    });
    
    test('Fractional Input', function(done) {
      var input = "3/2L";
      assert.equal(convertHandler.getNum(input),1.5)
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      var input = '3.4/1.7L';
      assert.equal(convertHandler.getNum(input),2);
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      let input = '3/4/2/4L';
      assert.equal(convertHandler.getNum(input),false)
      done();
    });
    
    test('No Numerical Input', function(done) {
      let input = 'c/cL';
      assert.equal(convertHandler.getNum(input), null)
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        let value = '32'+ele;
        // Need to convert ele.toUpperCase() on both so they match 
        assert.equal(convertHandler.getUnit(value).toUpperCase(), ele.toUpperCase());
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
      input.forEach(function (ele) {
        let value = '20ps'
        assert.notEqual(convertHandler.getUnit(value), ele);
      });
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','L','mi','km','lbs','kg'];
      var expect = ['L','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['km', 'mi', 'L', 'gal', 'lbs', 'kg'];
      var expect = ['kilometers','miles','litres','gallons','pounds','kilograms'];
      input.forEach(function(val,i){
        assert.equal(convertHandler.spellOutUnit(val),expect[i]);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      var input = [10, 'L'];
      var expected = 2.64172;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
    });
    
    test('Mi to Km', function(done) {
      let input = [26, 'mi'];
      let expected = 41.84284;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
    });
    
    test('Km to Mi', function(done) {
      let input = [21,'km'];
      let expected = 13.04883;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
    });
    
    test('Lbs to Kg', function(done) {
      let input = [135, 'lbs'];
      let expected = 61.23492;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
      
    });
    
    test('Kg to Lbs', function(done) {
      let input = [61, 'kg'];
      let expected = 134.48209;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
    });
    
  });

});