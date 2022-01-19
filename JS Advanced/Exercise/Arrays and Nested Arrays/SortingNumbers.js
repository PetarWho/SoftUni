function sortingNums(arr){
    let result = [];
    let flag = true;
    while(arr.length>0){
        if(flag){
            arr.sort((a,b)=>b-a);
            flag = false;
        } else{
            arr.sort((a,b)=>a-b);
            flag = true;
        }
        let current = arr.pop();
        result.push(current);
    }
    return result;
}