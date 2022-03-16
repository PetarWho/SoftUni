function utilityFunctions() {
    const url = `http://localhost:3030/jsonstore/collections/books`;

    const tableBodyElement = document.getElementById('table-body');
    const form = document.getElementById('form');
    const editForm = document.getElementById('edit-form');

    form.addEventListener('submit', submitBook);
    editForm.addEventListener('submit', submitEditBook);

    let bookId = '';
    async function loadBooks() {
        tableBodyElement.innerHTML = '';
        const booksResponse = await fetch(url);
        const booksResult = await booksResponse.json();

        for (const book in booksResult) {
            const trElement = document.createElement('tr');
            trElement.id = book;
            tableBodyElement.appendChild(trElement);

            const bookTitleElement = document.createElement('td');
            bookTitleElement.textContent = `${booksResult[book].title}`;
            trElement.appendChild(bookTitleElement);

            const authorElement = document.createElement('td');
            authorElement.textContent = `${booksResult[book].author}`;
            trElement.appendChild(authorElement);

            const buttonTdElement = document.createElement('td');
            trElement.appendChild(buttonTdElement);

            const editButton = document.createElement('button');
            editButton.textContent = `Edit`;
            buttonTdElement.appendChild(editButton);
            editButton.addEventListener('click', editBook);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = `Delete`;
            buttonTdElement.appendChild(deleteButton);
            deleteButton.addEventListener('click', deleteBook);
        }

        async function deleteBook(e) {
            const bookId = e.target.parentNode.parentNode.id;
            await fetch(`${url}/${bookId}`, {
                method: 'DELETE'
            });
        }
    }

    function editBook(e) {
        e.preventDefault();
        toggleFormClasses();
        const book = e.target.parentNode.parentNode;

        editForm.children[2].value = book.children[0].textContent;
        editForm.children[4].value = book.children[1].textContent;
        bookId = book.id;
    }

    async function submitEditBook(e) {
        e.preventDefault();

        const editFormData = new FormData(editForm);
        const putRequestBody = { author: editFormData.get('author'), title: editFormData.get('title') };
        await fetch(`${url}/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(putRequestBody)
        });

        Array.from(editForm.getElementsByTagName('input')).forEach(x => x.value = '');
        toggleFormClasses();
    }

    function toggleFormClasses() {
        form.className = form.className == '' ? 'form' : '';
        editForm.className = editForm.className == 'form' ? '' : 'form';
    }

    async function submitBook(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const bookRequestBody = { author: formData.get('author'), title: formData.get('title') };
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(bookRequestBody)
        })

        Array.from(form.getElementsByTagName('input')).forEach(x => x.value = '');
    }
    return { loadBooks, submitBook }
}

const utility = utilityFunctions();