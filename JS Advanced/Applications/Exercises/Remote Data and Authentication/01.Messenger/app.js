function attachEvents() {
    const url = `http://localhost:3030/jsonstore/messenger`;

    let submitBtn = document.getElementById('submit');
    let refreshBtn = document.getElementById('refresh');

    submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        let author = document.querySelector('#controls').children[1].value;
        let message = document.querySelector('#controls').children[4].value;
        
        let requestBody = { author: author, content: message };
        author = '';
        message = '';
        let postResponse = await fetch(url, {

            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(requestBody)
        })
    });

    refreshBtn.addEventListener('click', async (e)=>{
        e.preventDefault();

        const text = document.getElementById('messages');
        text.textContent = '';

        const responseMessages = await fetch(url);
        const resultMessages = await responseMessages.json();

        for (const message in resultMessages) {

            text.textContent += `${resultMessages[message].author}: ${resultMessages[message].content}\n`;

        }
        text.textContent.trimEnd();
    });
}

attachEvents();