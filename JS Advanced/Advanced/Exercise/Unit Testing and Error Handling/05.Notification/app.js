function notify(message) {
  let notificationElement = document.getElementById('notification');
  let messageElement = document.createElement('p');
  messageElement.textContent = message;
  if(notificationElement.children.length==0)
  notificationElement.appendChild(messageElement);
  notificationElement.style.display = "block";

  notificationElement.addEventListener('click',()=>{
    notificationElement.style.display = "none";
  })
}