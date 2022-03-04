function encodeAndDecodeMessages() {
    document.getElementById('main').children[0].children[2].addEventListener('click', encode);
    document.getElementById('main').children[1].children[2].addEventListener('click', decode);
    let message = '';

    function encode(e) {
        message = e.target.parentNode.children[1].value;
        message = message.split('').map(x => {

            let ascii = x.charCodeAt(0);
            ascii++;
            return String.fromCharCode(ascii);

        }).join('');
        e.target.parentNode.children[1].value = null;
        document.getElementsByTagName('textarea')[1].value = message;
    }


    function decode(e){
        e.target.parentNode.children[1].value = e.target.parentNode.children[1].value
        .split('').map(x => {
            let asciiValue = x.charCodeAt(0);
            asciiValue--;
            return String.fromCharCode(asciiValue);
        }).join('');
    }
}