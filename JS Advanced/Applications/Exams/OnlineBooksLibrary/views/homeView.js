import { html, render } from "../node_modules/lit-html/lit-html.js";
import * as bookService from '../services/bookService.js';

const bookTemplate = (book) => html`
<li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src="${book.imageUrl}"></p>
    <a class="button" href="/books/${book._id}">Details</a>
</li>
`;

const homeTemplate = (books) => html`
<!-- Dashboard Page ( for Guests and Users ) -->
<section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>
    <!-- Display ul: with list-items for All books (If any) -->
    ${books!=0 ? html`
    <ul class="other-books-list">
        ${books.map(x=>bookTemplate(x))}
    </ul>
    `: html`
    <!-- Display paragraph: If there are no books in the database -->
    <p class="no-books">No books in database!</p>`}
</section>
`;

export const homeView = (ctx) =>{
    bookService.getAll().then(books=>{
        render(homeTemplate(books),document.querySelector('#container'));
    })
}