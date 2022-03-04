function validate() {
    const emailElement = document.getElementById('email');
    emailElement.addEventListener('change', (e)=>{
        if(!/\w+\@\w+\.\w+/.test(e.target.value)){
            e.target.classList.add('error');
        } else{
            e.target.classList.remove('error');
        }
    })
}