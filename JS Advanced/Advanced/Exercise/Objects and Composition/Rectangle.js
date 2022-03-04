function rectangle(width, height, color){
    function betterColor(input){
        let result = '';
        result +=color[0].toUpperCase();
        for(let i =1;i<color.length; i++){
            result+=color[i].toLowerCase();
        }
        return result;
    }

    console.log(color[0].toUpperCase());
    let obj = {
        width,
        height,
        color:betterColor(color),
        calcArea(){
            return this.width*this.height;
        }
    }
    return obj;
}
let rect = rectangle(4, 5, 'red');
console.log(rect.width);
console.log(rect.height);
console.log(rect.color);
console.log(rect.calcArea());