import { html, render, nothing } from "../node_modules/lit-html/lit-html.js";
import { isAuthenticated } from "../services/authService.js";
import * as movieService from '../services/movieService.js';

const isOwner = (albumOwner) => {
    if (isAuthenticated()) {
        let user = JSON.parse(sessionStorage.user);
        if (user._id == albumOwner) return true;
    }
    return false;
}

const detailsTemplate = (movie) => html`
<!--Details Page-->
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src="${movie.imgUrl}">
        </div>
        <div class="albumInfo">
            <div class="albumText">
                <h1>${movie.name}</h1>
                <div>
                    <h3>Main Actor: ${movie.mainActor}</h3>
                    <h4>Genre: ${movie.genre}</h4>
                    <h4>Date: ${movie.releaseDate}</h4>
                    <p>${movie.description}</p>
                </div>
            </div>

            ${isOwner(movie._ownerId) ? html`
            <!-- Only for registered user and creator of the album-->
            <div class="actionBtn">
                <a id=${movie._id} href="/albums/${movie._id}/edit" class="edit">Edit</a>
                <a id=${movie._id} @click=${movieService.deleteMovie} href="javascript:void(0)" class="remove">Delete</a>
            </div>`: nothing}
        </div>
    </div>
</section>
`;

export const detailsView = (ctx) => {
    movieService.getOne(ctx.params.albumId).then(movie=>{
        render(detailsTemplate(movie), document.querySelector('#box'));
    });
}