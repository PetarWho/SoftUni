import { html, render } from "../node_modules/lit-html/lit-html.js";
import * as authService from '../services/authService.js';

const registerTemplate = (registerHandler) => html`
<!-- Register Page ( Only for Guest users ) -->
<section id="register-page" class="register">
    <form @submit=${registerHandler} id="register-form" action="" method="">
        <fieldset>
            <legend>Register Form</legend>
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
            <p class="field">
                <label for="repeat-pass">Repeat Password</label>
                <span class="input">
                    <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Register">
        </fieldset>
    </form>
</section>
`;

export const registerView = (ctx) => {
    const registerHandler = (e) => {
        e.preventDefault();

        let {email, password, ['confirm-pass']:repass} = Object.fromEntries(new FormData(e.currentTarget));
        
        if(!email || !password || !repass){
            alert('All fields are required!');
        }
        else if (repass !==password){
            alert('Password missmatch!');
        }
        else{
            authService.register(email, password).then(user=> ctx.page.redirect('/'));
        }
    }

    render(registerTemplate(registerHandler), document.querySelector('#container'));
}