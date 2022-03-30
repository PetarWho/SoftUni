import { html, render } from "../node_modules/lit-html/lit-html.js";
import * as authService from "../Services/authService.js";

const loginTemplate = (loginHandler) => html`
    <!-- Login Page ( Only for Guest users ) -->
    <section id="login-page" class="auth">
            <form @submit=${loginHandler} id="login">

                <div class="container">
                    <div class="brand-logo"></div>
                    <h1>Login</h1>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

                    <label for="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password">
                    <input type="submit" class="btn submit" value="Login">
                    <p class="field">
                        <span>If you don't have profile click <a href="#">here</a></span>
                    </p>
                </div>
            </form>
        </section>
`;

export const loginView = (ctx) =>{
    const loginHandler = (e)=>{
        e.preventDefault();

        let { email, password } = Object.fromEntries(new FormData(e.currentTarget));
        authService.login(email, password).then(user => {
            ctx.page.redirect('/');
        })
    }
    render(loginTemplate(loginHandler), document.querySelector('#box'));
}