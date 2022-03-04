function townsToJSON(arr){
    let resultArr = [];
    for(let i =1; i<arr.length; i++){
        let newArr = arr[i].split('|').filter(n=>n);
        const obj = {
            Town:newArr[0].trim(),
            Latitude: Math.round((Number(newArr[1])) * 100) / 100,
            Longitude: Math.round((Number(newArr[2])) * 100) / 100 
        }
        resultArr.push(obj);
    }
    let output = JSON.stringify(resultArr);
    console.log(output);
}

townsToJSON(['| Town | Latitude | Longitude |',
'| Sofia | 42.696552 | 23.32601 |',
'| Beijing | 39.913818 | 116.363625 |']
)