function colorize() {
    let arr = Array.from(document.getElementsByTagName('tr'));
    for(let i = 0; i<arr.length;i++){
        let current = arr[i];
        if(i%2==1){
            current.style.backgroundColor = 'teal';
        }
    }
}