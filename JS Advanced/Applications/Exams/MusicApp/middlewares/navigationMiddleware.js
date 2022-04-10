import { html, render } from "../node_modules/lit-html/lit-html.js";
import { isAuthenticated, logout } from "../services/authService.js";

const navTemplate = () => html`
<!--Navigation-->
<header>
    <nav>
        <img src="./images/headphones.png">
        <a href="/">Home</a>
        <ul>
            <!--All user-->
            <li><a href="/catalog">Catalog</a></li>
            <li><a href="/search">Search</a></li>
            ${isAuthenticated() ? html`
            <!--Only user-->
            <li><a href="/create">Create Album</a></li>
            <li><a @click=${logout} href="javascript:void(0)">Logout</a></li>
            `: html`
            <!--Only guest-->
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
            `}
        </ul>
    </nav>
</header>
`;

export const navigationMiddleware = (ctx, next) => {
    render(navTemplate(), document.querySelector('#navigation'));
    next();
}