function solve() {
    const name = document.getElementById('container').children[0];
    const hall = document.getElementById('container').children[1];
    const price = document.getElementById('container').children[2];
    document.querySelector('#container button').addEventListener('click', addMovie);
    const moviesUl = document.querySelector('#movies ul');
    const archiveUl = document.querySelector('#archive ul');
    document.querySelector('#archive button').addEventListener('click', clearArchive);

    function addMovie(e) {
        e.preventDefault();

        if (name.value && hall.value && Number(price.value)) {
            const liElement = document.createElement('li');
            const spanElement = document.createElement('span');
            spanElement.textContent = name.value;
            liElement.appendChild(spanElement);
            const strongElement = document.createElement('strong');
            strongElement.textContent = `Hall: ${hall.value}`;
            liElement.appendChild(strongElement);
            const divElement = document.createElement('div');
            const strongToDivElement = document.createElement('strong');
            strongToDivElement.textContent = Number(price.value).toFixed(2);
            divElement.appendChild(strongToDivElement);
            const inputElement = document.createElement('input');
            inputElement.placeholder = 'Tickets Sold';
            divElement.appendChild(inputElement);
            const archiveButton = document.createElement('button');
            archiveButton.textContent = 'Archive';
            archiveButton.addEventListener('click', archiveMovie);
            divElement.appendChild(archiveButton);
            liElement.appendChild(divElement);
            moviesUl.appendChild(liElement);
        }

        name.value = '';
        hall.value = '';
        price.value = '';

        function archiveMovie(ev) {
            if (ev.target.parentNode.children[1].value && Number(ev.target.parentNode.children[1].value) >= 0) {
                const movieLi = ev.target.parentNode.parentNode;
                const newLi = document.createElement('li');
                const spanElement = document.createElement('span');
                spanElement.textContent = movieLi.children[0].textContent;
                newLi.appendChild(spanElement);
                const strongElement = document.createElement('strong');
                strongElement.textContent = `Total amount: ${(Number(movieLi.children[2].children[1].value) * Number(movieLi.children[2].children[0].textContent)).toFixed(2)}`;
                newLi.appendChild(strongElement);
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', (event) => event.target.parentNode.remove());
                newLi.appendChild(deleteButton);
                archiveUl.appendChild(newLi);
                movieLi.remove();
            }
        }
    }

    function clearArchive() {
        const archiveItems = Array.from(archiveUl.children);
        archiveItems.forEach(x => x.remove());
    }
}