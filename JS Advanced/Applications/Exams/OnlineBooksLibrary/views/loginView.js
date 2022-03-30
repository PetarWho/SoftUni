import { html, render } from "../node_modules/lit-html/lit-html.js";
import * as authService from '../services/authService.js';

const loginTemplate = (loginHandler) => html`
<!-- Login Page ( Only for Guest users ) -->
<section id="login-page" class="login">
    <form @submit=${loginHandler} id="login-form" action="" method="">
        <fieldset>
            <legend>Login Form</legend>
            <p class="field">
                <label for="email">Email</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Login">
        </fieldset>
    </form>
</section>
`;

export const loginView = (ctx) => {
    const loginHandler = (e) => {
        e.preventDefault();

        let { email, password } = Object.fromEntries(new FormData(e.currentTarget));

        if (email && password)
            authService.login(email, password).then(user => ctx.page.redirect('/'));
    }
    render(loginTemplate(loginHandler), document.querySelector('#container'));
}