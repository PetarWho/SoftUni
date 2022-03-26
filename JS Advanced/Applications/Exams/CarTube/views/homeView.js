import { html, render } from "../node_modules/lit-html/lit-html.js";
import { isAuthenticated } from "../services/authService.js";


const loggedUsersTemplate = () => html`
<div id="profile">
    <a>Welcome ${localStorage.getItem('username')}</a>
    <a href="/myListings">My Listings</a>
    <a href="/create">Create Listing</a>
    <a href="/logout">Logout</a>
</div>
`;

const guestUsersTemplate = () => html`
<div id="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
</div>
`;

const homeTemplate = () => html`
<!-- Navigation -->
<header>
    <nav>
        <a class="active" href="/">Home</a>
        <a href="/listings">All Listings</a>
        <a href="#">By Year</a>
        ${isAuthenticated() ? loggedUsersTemplate() : guestUsersTemplate()}
    </nav>
</header>

<main id="site-content">

            <!-- Main Content -->

        </main>

        <!-- Home Page -->
        <section id="main">
            <div id="welcome-container">
                <h1>Welcome To Car Tube</h1>
                <img class="hero" src="/images/car-png.webp" alt="carIntro">
                <h2>To see all the listings click the link below:</h2>
                <div>
                    <a href="/listings" class="button">Listings</a>
                </div>
            </div>
        </section>
`;

export const homeView = (ctx) => {
    render(homeTemplate(),document.querySelector('#container'));
}