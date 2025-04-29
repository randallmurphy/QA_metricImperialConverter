function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    const numRegex = /^[\d\.\/]+/;
    const match = input.match(numRegex);
    
    if (!match) return 1; // default to 1 if no number
    
    result = match[0];

    // handle invalid double fractions
    if (result.split('/').length > 2) {
      return 'invalid number';
    }

    // evaluate fraction if necessary
    if (result.includes('/')) {
      const [numerator, denominator] = result.split('/');
      result = parseFloat(numerator) / parseFloat(denominator);
    } else {
      result = parseFloat(result);
    }

    if (isNaN(result)) return 'invalid number';
    return result;
  };
  
  this.getUnit = function(input) {
    const unitRegex = /[a-zA-Z]+$/;
    const match = input.match(unitRegex);
    if (!match) return 'invalid unit';

    const unit = match[0].toLowerCase();
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    if (!validUnits.includes(unit)) return 'invalid unit';

    return unit === 'l' ? 'L' : unit;
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    return unitMap[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const spellMap = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    return spellMap[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        return 'invalid unit';
    }

    return parseFloat(result.toFixed(5));
  };
  
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const initUnitStr = this.spellOutUnit(initUnit);
    const returnUnitStr = this.spellOutUnit(returnUnit);
    return `${initNum} ${initUnitStr} converts to ${returnNum} ${returnUnitStr}`;
  };
  
}

module.exports = ConvertHandler;
