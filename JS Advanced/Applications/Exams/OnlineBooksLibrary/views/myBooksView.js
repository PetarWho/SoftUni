import { html, render, nothing } from "../node_modules/lit-html/lit-html.js";
import { isAuthenticated } from "../services/authService.js";
import * as bookService from '../services/bookService.js';

const bookTemplate = (book) => html`
<li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src="${book.imageUrl}"></p>
    <a class="button" href="/books/${book._id}">Details</a>
</li>
`;

const myBooksTemplate = (books) => html`
<!-- My Books Page ( Only for logged-in users ) -->
<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    <!-- Display ul: with list-items for every user's books (if any) -->
    ${books.length != 0 ? html`
    <ul class="my-books-list">
        ${books.map(x => bookTemplate(x))}
    </ul>
    `: html`
    <!-- Display paragraph: If the user doesn't have his own books  -->
    <p class="no-books">No books in database!</p>
    `}
</section>
`;

export const myBooksView = (ctx) => {
    bookService.getMyBooks(sessionStorage.getItem('_id')).then(books => {
        render(myBooksTemplate(books), document.querySelector('#container'));
    });
}