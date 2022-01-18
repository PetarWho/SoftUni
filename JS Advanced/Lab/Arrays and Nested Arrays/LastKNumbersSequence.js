function lastKnum(n, k){
    let arr = [1];
    for(let i = 0;i<n-1;i++){
        let sum = 0;
        for(let j = arr.length; j > arr.length-k-1;j--){
            sum+=(arr[j]==undefined?0:arr[j]);
        }
        arr.push(sum);
    }
    return arr;
}
