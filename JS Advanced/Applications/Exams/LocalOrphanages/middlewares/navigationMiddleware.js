import { html, render } from "../node_modules/lit-html/lit-html.js";
import { isAuthenticated, logout } from "../services/authService.js";

const navigationTemplate = () => html`
<header>
    <!-- Navigation -->
    <h1><a href="/">Orphelp</a></h1>

    <nav>
        <a href="/">Dashboard</a>

        ${isAuthenticated() ? html`
        <!-- Logged-in users -->
        <div id="user">
            <a href="/myPosts">My Posts</a>
            <a href="/create">Create Post</a>
            <a @click=${logout} href="javascript:void(0)">Logout</a>
        </div>
        `: html`
        <!-- Guest users -->
        <div id="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>
        `}
    </nav>
</header>
`;

export const navigationMiddleware = (ctx, next) => {
    render(navigationTemplate(), document.querySelector('#navigation'));
    next();
}