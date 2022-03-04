function wordsUppercase(str){
    str = str.toUpperCase();
    let regex = /[A-Za-z0-9]+/g;
    arr = [...str.matchAll(regex)];
    console.log(arr.join(', '));
}