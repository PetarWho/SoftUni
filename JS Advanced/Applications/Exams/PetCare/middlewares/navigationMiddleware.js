import { html, render } from '../node_modules/lit-html/lit-html.js';
import { isAuthenticated, logout } from '../services/authService.js';

const navTemplate = () => html`
<!--Navigation-->
<header>
    <nav>
        <section class="logo">
            <img src="./images/logo.png" alt="logo">
        </section>
        <ul>
            <!--Users and Guest-->
            <li><a href="/">Home</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
            ${isAuthenticated() ? html`
            <!--Only Users-->
            <li><a href="/create">Create Postcard</a></li>
            <li><a @click=${logout} href="javascript:void(0)">Logout</a></li>
            `: html`
            <!--Only Guest-->
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
            `}
        </ul>
    </nav>
</header>
`;

export const navigationMiddleware = (ctx, next) => {
    render(navTemplate(), document.querySelector('#navigationBar'));
    next();
}