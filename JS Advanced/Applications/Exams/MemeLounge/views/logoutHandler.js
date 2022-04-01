import * as authService from '../services/authService.js';

export const logoutHandler = (ctx) => {
    if (authService.isAuthenticated())
        authService.logout().then(() => ctx.page.redirect('/'));
}