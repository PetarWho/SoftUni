function sumTable() {
    let arr= Array.from(document.getElementsByTagName('td'));
    let totalSum = 0.0;
    for(let i = 0; i<arr.length-2;i++){
        if(i%2==1){
            totalSum+=Number(arr[i].textContent);
        }
    }
    document.getElementById('sum').textContent = totalSum;
}