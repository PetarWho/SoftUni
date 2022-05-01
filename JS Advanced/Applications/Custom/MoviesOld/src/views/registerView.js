import { render } from "../../node_modules/lit-html/lit-html.js";

import { registerTemplate } from "../templates/registerTemplate.js";
import * as authService from "../services/authService.js";

export const registerView = (ctx) => {
    const registerHandler = (e) => {
        e.preventDefault();

        let { email, username, password } = Object.fromEntries(new FormData(e.currentTarget));

        authService.register(email, username, password).then(user => {
            if(user.code!=403)
                ctx.page.redirect('/');
        });
    }
    render(registerTemplate(registerHandler), document.querySelector('#root'));

}