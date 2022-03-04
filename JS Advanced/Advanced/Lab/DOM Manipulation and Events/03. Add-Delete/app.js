function addItem() {
    let ulElement = document.getElementById('items');
    let inputElement = document.getElementById('newItemText');
    let elementToAppend = document.createElement("li");
    elementToAppend.textContent = inputElement.value;
    ulElement.appendChild(elementToAppend);


    let deleteElement = document.createElement("a");
    deleteElement.textContent = '[Delete]';
    deleteElement.href = "#";
    deleteElement.addEventListener("click", function(e){
        e.target.parentElement.remove();
    })
    elementToAppend.appendChild(deleteElement);

}