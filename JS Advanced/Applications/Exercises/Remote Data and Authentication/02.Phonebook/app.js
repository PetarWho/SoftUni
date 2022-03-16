function attachEvents() {
    const url = `http://localhost:3030/jsonstore/phonebook`;

    
    let phonebookElement = document.getElementById('phonebook');
    let personInput = document.getElementById('person');
    let phoneInput = document.getElementById('phone');
    let createRecordBtn = document.getElementById('btnCreate');
    let loadButton = document.getElementById('btnLoad');

    
    createRecordBtn.addEventListener('click', createRecord);
    loadButton.addEventListener('click', loadPhonebook);

    async function createRecord() {

        let requestBody = { person: personInput.value, phone: phoneInput.value };

        await fetch(url, {

            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })

        loadPhonebook(); 
    }

    async function deleteRecord(ev) {
        ev.preventDefault();

        let deleteEndpoint = `${url}/${ev.target.parentNode.id}`;
        await fetch(deleteEndpoint, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });

        loadPhonebook();
    }

    async function loadPhonebook() {
        phonebookElement.innerHTML = '';

        let phonebookResponse = await fetch(url);
        let phonebookResult = await phonebookResponse.json();

        for (const record in phonebookResult) {

            let liElement = document.createElement('li');
            liElement.textContent = `${phonebookResult[record].person}: ${phonebookResult[record].phone}`;
            liElement.id = record;
            phonebookElement.appendChild(liElement);

            let deleteButton = document.createElement('button');
            deleteButton.textContent = `Delete`;
            deleteButton.addEventListener(`click`, deleteRecord);
            liElement.appendChild(deleteButton);
        }
    }
}

attachEvents();