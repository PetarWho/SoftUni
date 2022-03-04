function RotateArray(arr,rotations){
    for(let i = 0; i<rotations;i++){
        let current = arr.pop();
        arr.unshift(current);
    }
    console.log(arr.join(' '));
}