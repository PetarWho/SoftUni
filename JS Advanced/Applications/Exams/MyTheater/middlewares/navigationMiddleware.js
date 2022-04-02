import { html, render } from '../node_modules/lit-html/lit-html.js'
import { isAuthenticated, logout } from '../services/authService.js';

const navTemplate = () => html`
<!--Navigation-->
<header>
    <nav>
        <a href="/">Theater</a>
        <ul>
            ${isAuthenticated()? html`
            <!--Only users-->
            <li><a href="/profile">Profile</a></li>
            <li><a href="/create">Create Event</a></li>
            <li><a @click=${logout} href="javascript:void(0)">Logout</a></li>
            `:html`
            <!--Only guest-->
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
            `}
        </ul>
    </nav>
</header>

<main id="content"></main>
`;

export const navigationMiddleware = (ctx, next) => {
    render(navTemplate(),document.querySelector('#navigation'));
    next();
}