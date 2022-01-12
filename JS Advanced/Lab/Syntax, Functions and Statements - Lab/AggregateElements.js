function aggregate(input){
    let sum = 0;
    let inverse = 0;
    let concat = '';
    for(let i=0;i<input.length;i++){
        sum+=input[i];
        inverse+= 1/input[i];
        concat+=input[i].toString();
    }
    console.log(sum);
    console.log(inverse);
    console.log(concat);
}