function depositCalculator(input){
    let deposit = Number(input[0]);
    let months = Number(input[1]);
    let interest = Number(input[2]);
    
    let percent = interest/100;

    let sum = deposit + (months *((deposit * percent)/12))
    console.log(sum);
}
depositCalculator(["200", "3", "5.7"])