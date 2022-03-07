function solve() {
    let busStop = 'depot';
    let currentBusStop = '';
    
    const spanElement = document.querySelector('.info');
    const departButton = document.getElementById('depart');
    const arriveButton = document.getElementById('arrive');
    
    const url = 'http://localhost:3030/jsonstore/bus/schedule';

    function disableButtons() {
        departButton.disabled = departButton.disabled ? false : true;
        arriveButton.disabled = arriveButton.disabled ? false : true;
    }

    let a = '';
    async function depart() {
        const endPoint = `${url}/${busStop}`;
        try{
            let response = await fetch(endPoint);
            a = response.body;
            let result = await response.json();
            spanElement.textContent = `Next stop ${result.name}`;
            currentBusStop = result.name;
            busStop = result.next;
            disableButtons();

        } catch{
            spanElement.textContent = a;
            console.log(a);
            departButton.disabled = true;
            arriveButton.disabled = true;
        }
    }

    function arrive() {
        spanElement.textContent = `Arriving at ${currentBusStop}`;
        disableButtons();
    }

    return {
        depart,
        arrive
    };
}

let result = solve();