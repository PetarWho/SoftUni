function editElement(el, match, replacer) {
    let doc = el.textContent;
    while(doc.includes(match)){
        doc = doc.replace(match,replacer);
    }
    el.textContent = doc;
}