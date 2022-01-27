function addItem() {
    let ulElement = document.getElementById('items');
    let inputElement = document.getElementById('newItemText');
    let elementToAppend = document.createElement("li");
    elementToAppend.textContent = inputElement.value;
    ulElement.appendChild(elementToAppend);
}