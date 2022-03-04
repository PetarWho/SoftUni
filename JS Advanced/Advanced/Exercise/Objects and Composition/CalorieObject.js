function calorieObject(arr) {

    let result = '{\n';
    for(let i = 0; i < arr.length; i+=2) {
        let key = arr[i];
        let value = arr[i + 1];
        result += `"${key}": ${value}`;
        if((arr[i + 2])){
            result += ',\n'; 
        } else {
            result += '\n}';
        }
    }
    console.log(JSON.parse(result));
}
