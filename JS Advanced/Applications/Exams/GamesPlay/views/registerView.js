import { html, render } from "../node_modules/lit-html/lit-html.js";
import * as authService from "../Services/authService.js";

const registerTemplate = (registerHandler) => html`
    
<!-- Register Page ( Only for Guest users ) -->
<section id="register-page" class="content auth">
    <form @submit=${registerHandler} id="register">
        <div class="container">
            <div class="brand-logo"></div>
            <h1>Register</h1>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="maria@email.com">

            <label for="pass">Password:</label>
            <input type="password" name="password" id="register-password">

            <label for="con-pass">Confirm Password:</label>
            <input type="password" name="confirm-password" id="confirm-password">

            <input class="btn submit" type="submit" value="Register">

            <p class="field">
                <span>If you already have profile click <a href="/login">here</a></span>
            </p>
        </div>
    </form>
</section>
`;

const isEmpty = (email, password) => {
    if (!email || !password) return true;
    return false;
}

export const registerView = (ctx) => {
    let isValid = true;
    const registerHandler = (e) => {
        e.preventDefault();
        let { email, password, ['confirm-password']: repeatPassword } = Object.fromEntries(new FormData(e.currentTarget))
        if (password !== repeatPassword) {
            isValid = false;
            alert('Password missmatch!');
        }
        else if(isEmpty(email, password)){
            isValid = false;
            alert('Fill all the fields!');
        }
        else {
            authService.register(email, password).then(user => {
                ctx.page.redirect('/');
            });
        }
    }
    if (isValid) {
        render(registerTemplate(registerHandler), document.querySelector('#box'));
    }
}