function extract(content) {
    let text = document.getElementById(content).textContent;
    let match = /\((?<word>[A-Za-z ]+)\)/g;
    let arr = text.match(match);
    let final = arr.join('; ');
    while(final.includes('(') || final.includes(')')) {
        final = final.replace('(','');
        final = final.replace(')','');
    }
    return final;
}
