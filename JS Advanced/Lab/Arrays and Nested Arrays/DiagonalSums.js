function diagonalSums(matrix) {
    let sumFirst = 0;
    let sumSecondary = 0;
    for (let j = 0; j < matrix.length; j++) {
        let first = Number(matrix[j][j]);
        let secondary = Number(matrix[j][matrix.length-1-j]);
        sumFirst += first;
        sumSecondary += secondary;
    }
    console.log(`${sumFirst} ${sumSecondary}`);
}