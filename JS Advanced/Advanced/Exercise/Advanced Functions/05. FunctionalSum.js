function add(a){
    let num = a;
    function anotherOne(b){
        num+=b;
        return anotherOne;
    }
    anotherOne.toString = function(){
        return num;
    };
    return anotherOne;
}