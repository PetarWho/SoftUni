import { html, render, nothing } from "../node_modules/lit-html/lit-html.js"
import { isAuthenticated } from "../services/authService.js";
import * as movieService from "../services/movieService.js";
import page from "../node_modules/page/page.mjs";

const albumTemplate = (album) => html`
<div class="card-box">
    <a href="/albums/${album._id}" id="details">
        <img src="${album.imgUrl}">
    </a>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Main Actor: ${album.mainActor}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
    </div>
</div>
`;

const catalogTemplate = (albums) => html`
<!--Catalog-->
<section id="catalogPage">
    <h1>All Movies</h1>
    ${albums.length != 0 ? html`
    ${albums.map(x => albumTemplate(x))}` : html`
    <!--No albums in catalog-->
    <p>There are no any movies!</p>
    `}
</section>
`;

export const catalogView = (ctx) => {
    movieService.getAll().then(albums => render(catalogTemplate(albums), document.querySelector('#box')));
}