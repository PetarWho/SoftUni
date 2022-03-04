function currencyFormatter(separator, symbol, symbolFirst, value) {
    let result = Math.trunc(value) + separator;
    result += value.toFixed(2).substr(-2,2);
    if (symbolFirst) return symbol + ' ' + result;
    else return result + ' ' + symbol;
}

function createFormatter(separator,sign,symbolFirst, formatter){
    let innerFunc = function(value) {
        return formatter(separator, sign, symbolFirst, value);
    }
    return innerFunc;
}