sap.ui.define(
    [
      // prettier 방지용 주석
      'sap/ui/model/FormatException',
      'sap/ui/model/ParseException',
      'sap/ui/model/SimpleType',
    ],
    (
      // prettier 방지용 주석
      FormatException,
      ParseException,
      SimpleType
    ) => {
      'use strict';
  
      return SimpleType.extend('sap.ui.time.mvc.model.type.Mileage', {
        formatValue(oValue, sTargetType) {
          switch (this.getPrimitiveType(sTargetType)) {
            case 'string':
            case 'any':
              return this._toString(oValue, sTargetType);
            case 'number':
              return this._toNumber(oValue, sTargetType);
            default:
              throw new FormatException(`Don't know how to format Mileage to ${sTargetType}`);
          }
        },
  
        parseValue(oValue, sTargetType) {
          switch (this.getPrimitiveType(sTargetType)) {
            case 'string':
              return this._toString(oValue, sTargetType);
            case 'number':
            case 'any':
              return this._toNumber(oValue, sTargetType);
            default:
              throw new ParseException(`Don't know how to parse Mileage from ${sTargetType}`);
          }
        },
  
        validateValue() {
          return true;
        },
  
        _toString(oValue, sTargetType) {
          if (!oValue) {
            return '';
          }
  
          if (typeof oValue === 'number' || oValue instanceof Number || typeof oValue === 'string' || oValue instanceof String) {
            // return (oValue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
            return _.toNumber(oValue.toString().replace(/,/g, '')) === 0 ? '' : new Intl.NumberFormat('ko-KR').format(oValue.toString().replace(/,/g, ''));
          }
  
          throw new FormatException(`Don't know how to format Mileage to ${sTargetType}`);
        },
  
        _toNumber(oValue, sTargetType) {
          if (!oValue) {
            return 0;
          }
  
          if (typeof oValue === 'number' || oValue instanceof Number) {
            return oValue;
          }
  
          if (typeof oValue === 'string' || oValue instanceof String) {
            return Number(oValue);
          }
  
          throw new ParseException(`Don't know how to parse Mileage from ${sTargetType}`);
        },
      });
    }
  );