function sameNumbers(num){
    if(Number.isInteger(num)){
        let temp = num.toString();
        let valid = true;
        let sum = 0;
        for(let i = 0; i<num.toString().length-1; i++){
            let currentNum = temp[i];
            sum+=Number(currentNum);
            if(currentNum != temp[i+1]){
                valid = false;
            }
            if(i==temp.length-2)
            sum+=Number(temp[i+1])
        }
        console.log(valid);
        console.log(sum);
    }
}