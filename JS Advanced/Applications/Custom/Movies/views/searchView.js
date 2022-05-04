import { html, render, nothing } from "../node_modules/lit-html/lit-html.js"
import * as movieService from "../services/movieService.js";

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

const searchTemplate = (searchHandler, movies, randomHandler) => html`
        <!--Search Page-->
        <section id="searchPage">
            <h1>Search by Name</h1>
        
            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter movie's name" autocomplete="off">
                <button @click=${searchHandler} class="button-list reset-form">Search</button>
                <button @click=${randomHandler} class="button-list reset-form">Random</button>
            </div>
            ${movies == "first" ? nothing : html`
            <h2>Results:</h2>
            <div class="search-result">
        
                ${Array.isArray(movies) ? html`
                ${movies.length != 0 ? html`
                <!--If have matches-->
                ${movies.map(x => movieTemplate(x))}
                `: html`
                <!--If there are no matches-->
                <p class="no-result">No results.</p>
                `}
                `: html`
                ${movieTemplate(movies)}
                `}
            </div>
            `}
        
        </section>
`;

let prevMovie = { _id: 123 };
export const searchView = (ctx) => {
    const randomHandler = (e) => {
        movieService.getAll().then(movies => {
            let item = movies[Math.floor(Math.random() * movies.length)];
            while (prevMovie._id == item._id) item = movies[Math.floor(Math.random() * movies.length)];
            prevMovie = item;
            
            movieService.getOne(item._id).then(movie => {
                render(searchTemplate(searchHandler, movie, randomHandler), document.querySelector('#box'));
            });
        })
        document.querySelector('#search-input').value = '';
    }
    const searchHandler = (e) => {
        let searchText = document.getElementById('search-input');
        movieService.search(searchText.value).then(movies => {
            render(searchTemplate(searchHandler, movies, randomHandler), document.querySelector('#box'));
        })
    }
    render(searchTemplate(searchHandler, "first", randomHandler), document.querySelector('#box'));
}