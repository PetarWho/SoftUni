import { html, render } from "../node_modules/lit-html/lit-html.js";
import * as authService from "../services/authService.js";

const loginTemplate = (loginHandler) => html`
    <!-- Login Page -->
    <section id="login">
        <div class="container">
            <form @submit=${loginHandler} id="login-form" action="#" method="post">
                <h1>Login</h1>
                <p>Please enter your credentials.</p>
                <hr>
    
                <p>Username</p>
                <input placeholder="Enter Username" name="username" type="text">
    
                <p>Password</p>
                <input type="password" placeholder="Enter Password" name="password">
                <input type="submit" class="registerbtn" value="Login">
            </form>
            <div class="signin">
                <p>Dont have an account?
                    <a href="/register">Sign up</a>.
                </p>
            </div>
        </div>
    </section>
`;

export const loginView = (ctx) => {
    const loginHandler = (e) => {
        e.preventDefault();

        let { username, password } = Object.fromEntries(new FormData(e.currentTarget));

        authService.login(username, password).then(user => {
            ctx.page.redirect('/');
        })
        
    }
    render(loginTemplate(loginHandler), document.querySelector('#container'));
}