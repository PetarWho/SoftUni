function create(words) {
   for (const word of words) {
      let currentDiv = document.createElement('div');
      let currentParagraph = document.createElement('p');
      currentParagraph.textContent = word;
      currentParagraph.style.display = 'none';
      currentDiv.appendChild(currentParagraph);
      currentDiv.addEventListener('click', (e)=>{
         e.target.children[0].style.display = 'block'
      });
      document.getElementById('content').appendChild(currentDiv);
   }
}