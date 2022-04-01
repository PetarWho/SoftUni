import { html, render, nothing } from "../node_modules/lit-html/lit-html.js";
import { isAuthenticated } from "../services/authService.js";
import * as bookService from '../services/bookService.js';
import * as likeService from '../services/likeService.js';

const isOwner = (ownerId) => {
    return Boolean(ownerId == sessionStorage.getItem('_id'));
}

const isLikeVisible = (ownerId) => {
    return Boolean(!isOwner(ownerId) && isAuthenticated());
}

const detailsTemplate = (book) => html`
    <!-- Details Page ( for Guests and Users ) -->
    <section id="details-page" class="details">
        <div class="book-information">
            <h3>${book.title}</h3>
            <p class="type">Type: ${book.type}</p>
            <p class="img"><img src="${book.imageUrl}"></p>
            <div class="actions">
                ${isOwner(book._ownerId) ? html`
                <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                <a class="button" href="/books/${book._id}/edit">Edit</a>
                <a id=${book._id} @click=${bookService.deleteBook} class="button" href="javascript:void(0)">Delete</a>
                `: nothing}
    
                <!-- Bonus -->
                <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
                ${isLikeVisible(book._ownerId) ? html`
                <a class="button" onlcick=${likeBook()} href="/books/${book._id}">Like</a>
                `: nothing}
    
                <!-- ( for Guests and Users )  -->
                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: 6</span>
                </div>
                <!-- Bonus -->
            </div>
        </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${book.description}</p>
        </div>
    </section>
`;

const likeBook = (bookId) => likeService.like(bookId).then(like => {
});

export const detailsView = (ctx) => {
    bookService.getOne(ctx.params.bookId).then(book => {
        render(detailsTemplate(book), document.querySelector('#container'));
    });
}