function loadRepos() {
   let divElement = document.getElementById('res');
   let xhr = new XMLHttpRequest();
   const url = "https://api.github.com/users/testnakov/repos";
   xhr.open("GET", url, true);
   xhr.onreadystatechange = (e)=>{
      if(xhr.readyState === 4){
         divElement.textContent = xhr.responseText;
      }
   }
   xhr.send();
}