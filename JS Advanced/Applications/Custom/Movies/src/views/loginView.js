import { render } from "../../node_modules/lit-html/lit-html.js";

import { loginTemplate } from "../templates/loginTemplate.js";
import * as authService from "../services/authService.js";

export const loginView = (ctx, next) => {
    const loginHandler = (e) => {
        e.preventDefault();

        let { email, password } = Object.fromEntries(new FormData(e.currentTarget));

        authService.login(email, password).then(user => {
            if(user.code!=403)
                ctx.page.redirect('/');
        });
    }
    render(loginTemplate(loginHandler), document.querySelector('#root'));
}