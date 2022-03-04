function negativePositiveNum(arr){
    let result = [];
    for(item of arr){
        if(Number(item)<0)
            result.unshift(item);
        else
            result.push(item);
    }
    result.forEach(x=>console.log(x));
}