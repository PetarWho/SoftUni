class Hex{
    constructor(value){
        this.value = Number(value);
    }
    valueOf(){
        return this.value;
    }
    toString(){
        return '0x'+this.value.toString(16).toUpperCase();
    }
    plus(number){
        let calcValue = this.value + Number(number);
        let current = new Hex(calcValue);
        return current;
    }
    minus(number){
        let calcValue = this.value - Number(number);
        let current = new Hex(calcValue);
        return current;
    }
    parse(string){
        return parseInt(string,16)
    }
}
let FF = new Hex(255);
console.log(FF.toString());
FF.valueOf() + 1 == 256;
let a = new Hex(10);
let b = new Hex(5);
console.log(a.plus(b).toString());
console.log(a.parse(a.plus(b)));
console.log(a.plus(b).toString()==='0xF');
console.log(FF.parse('AAA'));

