import { html, render } from "../node_modules/lit-html/lit-html.js";
import * as authService from "../services/authService.js";

const registerTemplate = () => html`
<!-- Register Page ( Only for guest users ) -->
<section id="register">
    <form @submit=${authService.register} id="register-form">
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <div class="gender">
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male" checked>
                <label for="male">Male</label>
            </div>
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a @click=${authService.logout} href="javascript:void(0)">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>
`;

export const registerView = (ctx) => render(registerTemplate(), document.querySelector('#container'));
