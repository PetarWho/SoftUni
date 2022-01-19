function magicMatrices(array = []) {
    let isMagical = true;
    let checker = [];
    let currentRowSum = 0;
    let totalSum = 0;
    for (let i = 0; i < array[0].length; i++) {
        totalSum += array[0][i];
    }
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            currentRowSum += array[i][j];
            checker[j] = (checker[j] || 0) + array[i][j];
        }
        if (currentRowSum !== totalSum) {
            isMagical = false;
            return isMagical;
        }
        currentRowSum = 0;
    }
    if (checker.some(e => e !== totalSum)) {
        isMagical = false;
        return isMagical;
    }
    return isMagical;
}
