window.onload = getInfo;

function getInfo() {
    let busId = document.getElementById('stopId').value;
    let ulElement = document.getElementById('buses');
    let divStopName = document.getElementById('stopName');
    let btnElement = document.getElementById('submit');

    const url = 'http://localhost:3030/jsonstore/bus/businfo';
    
    btnElement.addEventListener('click', getBuses);

    async function getBuses(e) {
        e.preventDefault();

        if (busId) {
            const endpoint = `${url}/${busId}`;

            ulElement.innerHTML = '';

            try {
                let response = await fetch(endpoint);
                let result = await response.json();
                divStopName.textContent = result.name;

                for (const key in result.buses) {
                    const liElement = document.createElement('li');
                    liElement.textContent = `Bus ${key} arrives in ${result.buses[key]} minutes`;
                    ulElement.appendChild(liElement);
                }

            } catch {
                divStopName.textContent = `Error`;
            }
        }
    }
}