import { html, render, nothing } from "../node_modules/lit-html/lit-html.js"
import { isAuthenticated } from "../services/authService.js";
import * as musicService from "../services/musicService.js";

const albumTemplate = (album) => html`
<div class="card-box">
    <img src="${album.imgUrl}">
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: $${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        ${isAuthenticated() ? html`
        <div class="btn-group">
            <a href="/albums/${album._id}" id="details">Details</a>
        </div>`: nothing}
    </div>
</div>
`;

const catalogTemplate = (albums) => html`
<!--Catalog-->
<section id="catalogPage">
    <h1>All Albums</h1>
    ${albums.length != 0 ? html`
    ${albums.map(x => albumTemplate(x))}` : html`
    <!--No albums in catalog-->
    <p>No Albums in Catalog!</p>
    `}
</section>
`;

export const catalogView = (ctx) => {
    musicService.getAll().then(albums => render(catalogTemplate(albums), document.querySelector('#box')));
}