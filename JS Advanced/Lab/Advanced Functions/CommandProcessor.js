function solution(){
    let final = '';

    return {
        append,
        removeStart,
        removeEnd,
        print
    }
    function append(str){
        final+=str;
    }
    function removeStart(lettersCount){
        final = final.substring(lettersCount);
    }
    function removeEnd(lettersCount){
        final = final.substring(0, final.length - lettersCount);
    }
    function print(){
        console.log(final);
    }
}
