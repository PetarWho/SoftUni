import * as authService from "../services/authService.js";

export const logoutHandler = (ctx) => {
    if (Boolean(localStorage.getItem('accessToken')))
        authService.logout().then(() => {
            ctx.page.redirect('/');
        });
}