function area() {
    return Math.abs(this.x * this.y);
};

function vol() {
    return Math.abs(this.x * this.y * this.z);
};

function solve(area, vol, input) {
    let arrOfCoordinates = JSON.parse(input);
    let resultArr = [];
    for (const obj of arrOfCoordinates) {
        let newObj = {
            area:area.call(obj),
            volume:vol.call(obj)
        }
        resultArr.push(newObj);
    }
    return resultArr;
}