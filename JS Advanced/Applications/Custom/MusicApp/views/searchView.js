import { html, render, nothing } from "../node_modules/lit-html/lit-html.js"
import * as movieService from "../services/movieService.js";

const movieTemplate = (movie) => html`
<div class="card-box">
    <a href="/albums/${movie._id}" id="details">
        <img src="${movie.imgUrl}">
    </a>
    <div>
        <div class="text-center">
            <p class="name">Name: ${movie.name}</p>
            <p class="artist">Main Actor: ${movie.mainActor}</p>
            <p class="genre">Genre: ${movie.genre}</p>
            <p class="date">Release Date: ${movie.releaseDate}</p>
        </div>
    </div>
</div>
`;

const searchTemplate = (searchHandler, movies) => html`
        <!--Search Page-->
        <section id="searchPage">
            <h1>Search by Name</h1>
        
            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter movie's name" autocomplete="off">
                <button @click=${searchHandler} class="button-list reset-form">Search</button>
                <button class="button-list reset-form" type="reset">Reset</button>
            </div>
            ${movies == "first" ? nothing : html`
            <h2>Results:</h2>
            <div class="search-result">
                ${movies.length != 0 ? html`
                <!--If have matches-->
                ${movies.map(x => movieTemplate(x))}
                `: html`
                <!--If there are no matches-->
                <p class="no-result">No results.</p>
                `}
            </div>
            `}
        
        </section>
`;

export const searchView = (ctx) => {
    const searchHandler = (e) => {
        let searchText = document.getElementById('search-input');
        movieService.search(searchText.value).then(movies => {
            render(searchTemplate(searchHandler, movies), document.querySelector('#box'));

        })
    }
    render(searchTemplate(searchHandler, "first"), document.querySelector('#box'));
}