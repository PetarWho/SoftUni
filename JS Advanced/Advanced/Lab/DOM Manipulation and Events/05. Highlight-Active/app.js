function focused() {
    let divParent = document.getElementsByTagName('div')[0];
    let divChildren = Array.from(divParent.children);

    for(let div of divChildren) {

        div.children[1].addEventListener('focus', onFocus);
        div.children[1].addEventListener('blur', onBlur);
        
    }

    function onFocus(e) {
        e.target.parentNode.classList.add('focused');
    }
    function onBlur(e) {
        e.target.parentNode.classList.remove('focused');
    }
}