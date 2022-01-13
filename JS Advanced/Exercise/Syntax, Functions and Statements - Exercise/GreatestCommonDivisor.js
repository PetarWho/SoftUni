function GCD(num1, num2){
    for(let i = num1; i>0; i--){
        if(Number.isInteger(num1/i) && Number.isInteger(num2/i)){
            console.log(i);
            break;
        }
    }
}