function pieceOfPie(arr, start, end){
    let result = [];
    let first = arr.indexOf(start);
    let last = arr.indexOf(end);
    for(let i = first;i<=last;i++){
        result.push(arr[i]);
    }
    return result;
}