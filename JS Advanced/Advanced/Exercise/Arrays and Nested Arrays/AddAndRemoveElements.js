function addRemove(arr){
    let initial = 1;
    let result = [];
    for(let i = 0; i<arr.length;i++){
        switch (arr[i]){
            case 'add': result.push(initial); break;
            case 'remove': result.pop(); break;
        }
        initial++;
    }
    if(result.length<1)
    console.log('Empty');
    else
    console.log(result.join('\n'));
}