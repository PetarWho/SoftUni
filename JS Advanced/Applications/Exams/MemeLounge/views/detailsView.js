import { html, render, nothing } from "../node_modules/lit-html/lit-html.js";
import { isAuthenticated } from "../services/authService.js";
import * as memeService from "../services/memeService.js";

const areButtonVisible = (meme) => {
    let user = JSON.parse(sessionStorage.user);
    let isOwner = () => Boolean(meme._ownerId === user._id);

    return Boolean(isAuthenticated() && isOwner());
}

const detailsTemplate = (meme) => html`
<!-- Details Meme Page (for guests and logged users) -->
<section id="meme-details">
    <h1>Meme Title: ${meme.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src="${meme.imageUrl}">
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
                ${meme.description}
            </p>
            ${isAuthenticated()? areButtonVisible(meme) ? html`
            <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
            <a class="button warning" href="/memes/${meme._id}/edit">Edit</a>
            <button @click=${memeService.deleteMeme} id = ${meme._id} class="button danger">Delete</button>
            `: nothing : nothing}
        </div>
    </div>
</section>
`;

export const detailsView = (ctx) => {
    memeService.getOneMeme(ctx.params.memeId).then(meme => {
        render(detailsTemplate(meme), document.querySelector('#container'));
    })
}