import {html, render} from "../../node_modules/lit-html/lit-html.js";

export const movieTemplate = (movie) =>
    html`
    <div class="movie-card" style="width: 18rem;">
            <img src="${movie.posterUrl}" class="card-img-top" alt="${movie.posterUrl}">
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <h6>${movie.genres.join(', ')}</h6>
                <a href="/movies/${movie._id}" class="btn btn-primary">View movie</a>
            </div>
        </div>
        
    `;