function attachEvents(){
    const url = `http://localhost:3030/jsonstore/phonebook`;

    let ulContacts = document.getElementById('phonebook');
    let btnLoad = document.getElementById('btnLoad');
    let btnCreate = document.getElementById('btnCreate');
    let personInput = document.getElementById('person');
    let phoneInput = document.getElementById('phone');

    btnLoad.addEventListener('click', loadContacts);

    async function loadContacts(){
        ulContacts.innerHTML = '';
        let apiContactsResponse = await fetch(url);
        let apiContactsResult = await apiContactsResponse.json();

        for(const person in apiContactsResult){
            let liElement = document.createElement('li');
            let deleteBtn = document.createElement('button');
            let userPic = document.createElement('img');

            userPic.src = "pics/contactPic.png";
            userPic.classList.add('userPic')

            liElement.textContent = `${apiContactsResult[person].person}: ${apiContactsResult[person].phone}`;
            liElement.id = person;
            liElement.classList.add('contacts');
            liElement.appendChild(userPic);
            

            deleteBtn.textContent = `Delete`;
            deleteBtn.classList.add('deleteBtn');

            deleteBtn.addEventListener('click', async (e)=>{
                e.preventDefault();
                await fetch(`${url}/${e.target.parentNode.id}`,{
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                loadContacts();
            });
            liElement.id = person;
            liElement.appendChild(deleteBtn);
            ulContacts.appendChild(liElement);
        }

    }

    btnCreate.addEventListener('click', async(e)=>{
        e.preventDefault();
        let requestBody = {person: personInput.value, phone: phoneInput.value}

        let res = await fetch(url);
        let data = await res.json();
        for (const user in data) {
            if(data[user].phone == requestBody.phone){
                alert(`This phone is already taken by ${data[user].person}`)
                return;
            }
        }

        await fetch(url,{
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body:   JSON.stringify(requestBody)
        })
        loadContacts();
    })
}
attachEvents();




// function attachEvents() {

    
//     let phonebookElement = document.getElementById('phonebook');
//     let personInput = document.getElementById('person');
//     let phoneInput = document.getElementById('phone');
//     let createRecordBtn = document.getElementById('btnCreate');
//     let loadButton = document.getElementById('btnLoad');

    
//     createRecordBtn.addEventListener('click', createRecord);
//     loadButton.addEventListener('click', loadPhonebook);

//     async function createRecord() {

//         let requestBody = { person: personInput.value, phone: phoneInput.value };

//         await fetch(url, {

//             method: 'POST',
//             headers: {
//                 'Content-type': 'application/json'
//             },
//             body: JSON.stringify(requestBody)
//         })

//         loadPhonebook(); 
//     }

//     async function deleteRecord(ev) {
//         ev.preventDefault();

//         let deleteEndpoint = `${url}/${ev.target.parentNode.id}`;
//         await fetch(deleteEndpoint, {
//             method: 'DELETE',
//             headers: {
//                 'Content-type': 'application/json'
//             }
//         });

//         loadPhonebook();
//     }

//     async function loadPhonebook() {
//         phonebookElement.innerHTML = '';

//         let phonebookResponse = await fetch(url);
//         let phonebookResult = await phonebookResponse.json();

//         for (const record in phonebookResult) {

//             let liElement = document.createElement('li');
//             liElement.textContent = `${phonebookResult[record].person}: ${phonebookResult[record].phone}`;
//             liElement.id = record;
//             phonebookElement.appendChild(liElement);

//             let deleteButton = document.createElement('button');
//             deleteButton.textContent = `Delete`;
//             deleteButton.addEventListener(`click`, deleteRecord);
//             liElement.appendChild(deleteButton);
//         }
//     }
// }

// attachEvents();