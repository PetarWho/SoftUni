import { html, render } from "../node_modules/lit-html/lit-html.js";
import * as authService from "../services/authService.js";

const registerTemplate = (registerHandler) => html`
    <!-- Register Page -->
    <section id="register">
        <div class="container">
            <form @submit=${registerHandler} id="register-form">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <hr>
    
                <p>Username</p>
                <input type="text" placeholder="Enter Username" name="username" required>
    
                <p>Password</p>
                <input type="password" placeholder="Enter Password" name="password" required>
    
                <p>Repeat Password</p>
                <input type="password" placeholder="Repeat Password" name="repeatPass" required>
                <hr>
    
                <input type="submit" class="registerbtn" value="Register">
            </form>
            <div class="signin">
                <p>Already have an account?
                    <a href="/login">Sign in</a>.
                </p>
            </div>
        </div>
    </section>
`;

export const registerView = (ctx) => {
    const registerHandler = (e) => {
        e.preventDefault();

        let { username, password, repeatPass } = Object.fromEntries(new FormData(e.currentTarget));

        if(password != repeatPass){
            alert('Password missmatch!');
        }
        else{
            authService.register(username, password, repeatPass).then(user => {
                ctx.page.redirect('/');
            });
        }
    }
    render(registerTemplate(registerHandler), document.querySelector('#container'));
}