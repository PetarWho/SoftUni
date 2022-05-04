import { html, render, nothing } from "../node_modules/lit-html/lit-html.js";
import { isAuthenticated } from "../services/authService.js";
import * as movieService from '../services/movieService.js';

const isOwner = (movieOwner) => {
    if (isAuthenticated()) {
        let user = JSON.parse(sessionStorage.user);
        if (user._id == movieOwner) return true;
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
            <div class="actionBtn">
                <a id=${movie._id} href="/watch/${movie._id}" class="watch">Watch</a>
                ${isOwner(movie._ownerId) ? html`
                <!-- Only for registered user and creator of the movie-->
                <a id=${movie._id} href="/movies/${movie._id}/edit" class="edit">Edit</a>
                <a id=${movie._id} @click=${movieService.deleteMovie} href="javascript:void(0)"
                    class="remove">Delete</a>
                `: nothing}
            </div>
        </div>
    </div>
</section>
`;

export const detailsView = (ctx) => {
    movieService.getOne(ctx.params.movieId).then(movie => {
        render(detailsTemplate(movie), document.querySelector('#box'));
    });
}