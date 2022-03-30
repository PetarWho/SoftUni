import { isAuthenticated } from '../services/authService.js';
import * as bookService from '../services/bookService.js';
import * as likeService from '../services/likeService.js';

export async function likeHandler(ctx) {
    await createLike(ctx.params.id);
    ctx.page.redirect(`/books/${ctx.params.id}`);
}