function evenPos(arr){
    let text= '';
    for(let i = 0;i<arr.length;i++){
        if(i%2==0)
            text+=arr[i]+' ';
    }
    console.log(text);
}