import * as authService from "../services/authService.js";

export const logoutHandler = (ctx, next) => {
    if (Boolean(localStorage.getItem('accessToken')))
        authService.logout().then(() => {
            window.location.reload();
        });

    next();
}