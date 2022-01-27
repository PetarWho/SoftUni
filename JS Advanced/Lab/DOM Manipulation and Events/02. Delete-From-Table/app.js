function deleteByEmail() {
   let inputElement = document.getElementsByTagName('input')[0];
   let resultElement = document.getElementById('result');
   let tdElements = document.getElementsByTagName('tr');

   for(let i=1;i<tdElements.length;i++){
       if(tdElements[i].children[1].textContent.includes(inputElement.value)){
           resultElement.textContent = 'Deleted.';
           tdElements[i].remove();
       }
       else resultElement.textContent = 'Not found.';
   }
}