import { html, render } from "../node_modules/lit-html/lit-html.js";
import * as gameService from "../Services/gameService.js";

const gameTemplate = (game) => html`
    <!-- Display div: with information about every game (if any) -->
    <div class="allGames">
        <div class="allGames-info">
            <img src="${game.imageUrl}">
            <h6>${game.category}</h6>
            <h2>${game.title}</h2>
            <a href="/catalogue/${game._id}" class="details-button">Details</a>
        </div>
    </div>
`;

const catalogueTemplate = (games) => html`
<!-- Catalogue -->
<main id="main-content"></main>
<section id="catalog-page">
    <h1>All Games</h1>
    ${games.length!=0 ? html`${games.map(x => gameTemplate(x))}` : html`
    <!-- Display paragraph: If there is no games  -->
    <h3 class="no-articles">No articles yet</h3>`}
</section>
</main>
    `;

export const catalogueView = (ctx) => {
    gameService.getAll().then(games => render(catalogueTemplate(games), document.querySelector('#box')));
}