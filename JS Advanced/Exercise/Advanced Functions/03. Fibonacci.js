function getFibonator(){
    
    let first = 1;
    let second = 1;
    let fibonacciNumber = 0;

    return function () {
        [fibonacciNumber, first, second] = [first, second, first + second]
        return fibonacciNumber;
    }
}