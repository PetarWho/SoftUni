import { html, render } from "../node_modules/lit-html/lit-html.js";
import { login } from "../services/authService.js";

const loginTemplate = () => html`
<!-- Login Page (Only for Guest users) -->
<section id="login-page" class="auth">
    <form @submit=${login} id="login">
        <h1 class="title">Login</h1>

        <article class="input-group">
            <label for="login-email">Email: </label>
            <input type="email" id="login-email" name="email">
        </article>

        <article class="input-group">
            <label for="password">Password: </label>
            <input type="password" id="password" name="password">
        </article>

        <input type="submit" class="btn submit-btn" value="Log In">
    </form>
</section>
`;

export const loginView = (ctx) =>{
    render(loginTemplate(), document.querySelector('#box'));
}