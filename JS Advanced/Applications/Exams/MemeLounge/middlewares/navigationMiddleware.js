import { html, render } from "../node_modules/lit-html/lit-html.js";
import { isAuthenticated, logout } from "../services/authService.js";

const loggedTemplate = () => html`
<!-- Logged users -->
<div class="user">
    <a href="/create">Create Meme</a>
    <div class="profile">
        <span>Welcome, ${JSON.parse(sessionStorage.user).email}</span>
        <a href=${isAuthenticated()?"/profile":"javascript:void(0)"}>My Profile</a>
        <a @click=${logout} href="javascript:void(0)">Logout</a>
    </div>
</div>
`;

const guestTemplate = () => html`
<!-- Guest users -->
<div class="guest">
    <div class="profile">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>
    <a class="active" href="/">Home Page</a>
</div>
`;

const navTemplate = () => html`
<!-- Navigation -->
<nav>
    <a href="/memes">All Memes</a>
    ${isAuthenticated() ? loggedTemplate() : guestTemplate()}
</nav>
`;

export const navigationMiddleware = (ctx, next) => {
    render(navTemplate(), document.querySelector('#navigation'))
    next();
}