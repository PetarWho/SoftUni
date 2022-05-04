import { html, render, nothing } from "../node_modules/lit-html/lit-html.js"
import { isAuthenticated } from "../services/authService.js";
import * as movieService from "../services/movieService.js";
import page from "../node_modules/page/page.mjs";

const movieTemplate = (movie) => html`
<div class="card-box">
    <a href="/movies/${movie._id}" id="details">
        <img src="${movie.imgUrl}">
    </a>
    <div>
        <div class="text-center">
            <p class="name">${movie.name}</p>
            <p class="artist">Main Actor: ${movie.mainActor}</p>
            <p class="genre">Genre: ${movie.genre}</p>
            <p class="date">Release Date: ${movie.releaseDate}</p>
        </div>
    </div>
</div>
`;

const catalogTemplate = (movies) => html`
<!--Catalog-->
<section id="catalogPage">
    <h1>All Movies</h1>
    ${movies.length != 0 ? html`
    ${movies.map(x => movieTemplate(x))}` : html`
    <!--No movies in catalog-->
    <p>There are no any movies!</p>
    `}
</section>
`;

export const catalogView = (ctx) => {
    movieService.getAll().then(movies => render(catalogTemplate(movies), document.querySelector('#box')));
}