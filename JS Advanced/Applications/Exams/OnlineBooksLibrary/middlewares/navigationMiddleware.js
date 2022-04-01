import { html, render } from "../node_modules/lit-html/lit-html.js";
import { isAuthenticated } from "../services/authService.js";

const guestTemplate = () => html`
<!-- Guest users -->
<div id="guest">
    <a class="button" href="/login">Login</a>
    <a class="button" href="/register">Register</a>
</div>`;

const loggedTemplate = () => html`
<!-- Logged-in users -->
<div id="user">
    <span>Welcome, ${sessionStorage.getItem('email')}</span>
    <a class="button" href="/books">My Books</a>
    <a class="button" href="/create">Add Book</a>
    <a class="button" href="/logout">Logout</a>
</div>`;

const navTemplate = () => html`
<header id="site-header">
    <!-- Navigation -->
    <nav class="navbar">
        <section class="navbar-dashboard">
            <a href="/">Dashboard</a>
            ${isAuthenticated() ?loggedTemplate():guestTemplate()}
        </section>
    </nav>
</header>
`;

export const navigationMiddleware = (ctx, next) => {
    render(navTemplate(), document.querySelector('#navigation'));
    next();
}