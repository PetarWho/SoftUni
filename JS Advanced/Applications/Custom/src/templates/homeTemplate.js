import { html } from "../../node_modules/lit-html/lit-html.js";

import { movieTemplate } from "./movieTemplate.js";


export const homeTemplate = (movies) =>
    html`
        <div class="movie-list">
            ${movies.map(x=>movieTemplate(x))}
        </div>
    `;