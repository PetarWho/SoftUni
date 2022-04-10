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
        <div class="btn-group">
            <a href="/albums/${album._id}" id="details">Details</a>
        </div>
    </div>
</div>
`;

const afterClick = (albums) => html`
<!--Show after click Search button-->
<div class="search-result">
    ${albums.length != 0 ? html`
    <!--If have matches-->
    ${albums.map(x => albumTemplate(x))}
    `: html`
    <!--If there are no matches-->
    <p class="no-result">No result.</p>
    `}
</div>
`;

let isClicked = false;

const searchTemplate = (albums) => html`
        <!--Search Page-->
        <section id="searchPage">
            <h1>Search by Name</h1>
        
            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
                <button @click=${isClicked = true} class="button-list">Search</button>
            </div>
            <h2>Results:</h2>
            ${isClicked ? afterClick(albums) : nothing}
        </section>
`;

export const searchView = (ctx) => {
    musicService.getAll().then(albums=>render(searchTemplate(albums), document.querySelector('#box')));
}