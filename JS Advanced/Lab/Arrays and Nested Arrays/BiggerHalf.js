function biggerHalf(arr){
    arr.sort((a,b)=>b-a)
    let result = [];
    for(let i = 0; i < Math.ceil(arr.length/2);i++){
        result.unshift(arr[i]);
    }
    return result;
}