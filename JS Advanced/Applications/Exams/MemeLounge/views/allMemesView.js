import { html, render } from "../node_modules/lit-html/lit-html.js";
import * as memeService from "../services/memeService.js";

const memeTemplate = (meme) => html`
<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${meme.title}</p>
            <img class="meme-image" alt="meme-img" src="${meme.imageUrl}">
        </div>
        <div id="data-buttons">
            <a class="button" href="/memes/${meme._id}">Details</a>
        </div>
    </div>
</div>
`;

const allMemesTemplate = (memes) => html`
<!-- All Memes Page ( for Guests and Users )-->
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        <!-- Display : All memes in database ( If any ) -->
        ${memes.length != 0 ? html`
            ${memes.map(x=>memeTemplate(x))}
        `: html`
        <!-- Display : If there are no memes in database -->
        <p class="no-memes">No memes in database.</p>
        `}

    </div>
</section>
`;

export const allMemesView = (ctx) =>{
    memeService.getAllMemes().then(memes=>render(allMemesTemplate(memes),document.querySelector('#container')));
}