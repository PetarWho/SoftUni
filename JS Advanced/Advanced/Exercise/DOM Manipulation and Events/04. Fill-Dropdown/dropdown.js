function addItem() {
   let textElement = document.getElementById('newItemText');
   let valueElement = document.getElementById('newItemValue');

   let option = document.createElement('option');
   option.textContent = textElement.value;
   option.value = valueElement.value;

   document.getElementById('menu').appendChild(option);
   textElement.value = '';
   valueElement.value = '';
}