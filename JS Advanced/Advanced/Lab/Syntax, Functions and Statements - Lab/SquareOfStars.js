function squareOfStars(n){
    for(let i = 0; i<n;i++){
        let output = '';
        for(let j = 0; j<n;j++){
            output+='* ';
        }
        console.log(output);
    }
}