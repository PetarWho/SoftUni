import { html, render, nothing } from "../node_modules/lit-html/lit-html.js";
import { isAuthenticated, logout } from "../services/authService.js";

const navTemplate = () => html`
<!--Navigation-->
<header>
    <nav>
        <a id="ghost" href="/">
            <img src="./images/ghost.png">
        </a>
        <a href="/">Movie Ghost</a>
        ${isAuthenticated()?html`<h3 class="greetings">Welcome, ${ JSON.parse(sessionStorage.user).email }</h3>`:nothing}
        <ul>
            <!--All user-->
            <li><a href="/movies">Movies</a></li>
            <li><a href="/search">Search</a></li>
            ${isAuthenticated() ? html`
            <!--Only user-->
            <li><a href="/create">Add Movie</a></li>
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