function sortArray(arr, order){
    if(order == 'asc'){
        arr.sort((a,b)=>a-b);
    } else if(order == 'desc'){
        arr.sort((a,b)=>b-a);
    }
    return arr;
}