import { isAuthenticated } from '../services/authService.js';
import * as bookService from '../services/bookService.js';

export const deleteHandler = async (ctx) => {
    try {
        let book = await bookService.getOne(ctx.params.bookId);

        let isConfirmed = confirm(`Do you want to delete ${book.title}?`)

        console.log(isConfirmed);
        console.log(isAuthenticated());

        if (isConfirmed && isAuthenticated()) {
            await bookService.remove(ctx.params.bookId);
            console.log('oooo');
            ctx.page.redirect('/');
        }
        else
            ctx.page.redirect(`/books/${book._id}`)
    } catch (err) {
        alert(err);
    }
}
