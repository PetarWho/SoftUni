import { html, render } from "../node_modules/lit-html/lit-html.js";
import { isAuthenticated } from "../Services/authService.js";

const loggedTemp = () => html`
<!-- Logged-in users -->
<div id="user">
    <a href="/create">Create Game</a>
    <a href="/logout">Logout</a>
</div>
`;
const guestTemp = () => html`
<!-- Guest users -->
<div id="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
</div>
`;

const navigationTemplate = () => html`
    <header>
        <!-- Navigation -->
        <h1><a class="home" href="/">GamesPlay</a></h1>
        <nav>
            <a href="/catalogue">All games</a>
            ${isAuthenticated()? loggedTemp() : guestTemp()}
        </nav>
    </header>
`;

export const navigationMiddleware = (ctx, next) =>{

    render(navigationTemplate(), document.querySelector('#navigation'));
    next();
}