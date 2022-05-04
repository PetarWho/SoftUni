import { html, render, nothing } from "../node_modules/lit-html/lit-html.js";
import * as movieService from '../services/movieService.js';

const watchTemplate = (movie) => html`
    <h1 class="h1-text">${movie.name}</h1>
    <section class="content">
        <div class="embed-container" id="embed-container-vcontent">
            <iframe src=${movie.videoUrl} frameborder="0" sandbox="allow-same-origin allow-scripts allow-forms"
                scrolling="no" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true"
                oallowfullscreen="0" msallowfullscreen="0" style="width: 70vw; height: 70vh; border: none;"></iframe>
        </div>
    </section>
`;

export const watchView = (ctx) => {
    movieService.getOne(ctx.params.movieId).then(movie => {
        render(watchTemplate(movie), document.querySelector('#box'));
    });
}