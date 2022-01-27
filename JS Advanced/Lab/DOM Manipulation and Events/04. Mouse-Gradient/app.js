function attachGradientEvents() {
    let gradientElement = document.getElementById('gradient');
    let resultElement = document.getElementById('result');

    gradientElement.addEventListener("mousemove",(e)=>{
        resultElement.textContent = `${Math.floor((e.offsetX/gradientElement.clientWidth)*100)}%`
    })
}