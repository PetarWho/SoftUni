import { html, render } from "../node_modules/lit-html/lit-html.js"
import { login } from "../services/authService.js";

const loginTemplate = () => html`
<!--Login-->
<section id="loginPage">
    <form @submit=${login}>
        <fieldset>
            <legend>Login</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <button type="submit" class="login">Login</button>

            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </fieldset>
    </form>
</section>
`;

export const loginView = (ctx) => {
    render(loginTemplate(), document.querySelector('#box'));
}