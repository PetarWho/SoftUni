import { html, render } from "../node_modules/lit-html/lit-html.js"

const homeTemplate = () => html`
<!--Home Page-->
<section id="welcomePage">
    <div id="welcome-message">
    </div>

    <h1 class="heading">Welcome to Movie Ghost</h1>
    <div class="movie-img">
        <img src="https://www.pngall.com/wp-content/uploads/2018/06/Cinema-High-Quality-PNG.png">
        <div class="text">
            <h2>Watch your favorite movies and explore more for free!</h2>
            <h2>You can search for your movie, or upload one if you cant find it!</h2>
            <h2>Enjoy :)</h2>
        </div>
    </div>
</section>
`;

export const homeView = (ctx) => {
    render(homeTemplate(), document.querySelector('#box'));
}