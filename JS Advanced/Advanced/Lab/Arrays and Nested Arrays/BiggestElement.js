function biggestElement(matrix){
    let max = matrix[0][0];
    for(let i = 0;i<matrix.length;i++){
        for(let j = 0; j<matrix[i].length;j++){
            max = matrix[i][j]>max?matrix[i][j]:max;
        }
    }
    return max;
}