import { html, render, nothing } from "../node_modules/lit-html/lit-html.js";
import * as theaterService from "../services/theaterService.js";

const IsOwner = (theater) => {
    if(sessionStorage.user){
        let user = JSON.parse(sessionStorage.user);
        return Boolean(theater._ownerId==user._id)
    }
    return false;
}

const detailsTemplate = (theater) => html`
<!--Details Page-->
<section id="detailsPage">
    <div id="detailsBox">
        <div class="detailsInfo">
            <h1>Title: ${theater.title}</h1>
            <div>
                <img src="${theater.imageUrl}" />
            </div>
        </div>

        <div class="details">
            <h3>Theater Description</h3>
            <p>${theater.description}</p>
            <h4>Date: ${theater.date}</h4>
            <h4>Author: ${theater.author}</h4>
            ${IsOwner(theater) ? html`
            <div class="buttons">
                <a @click=${theaterService.deleteEvent} id=${theater._id} class="btn-delete" href="javascript:void(0)">Delete</a>
                <a class="btn-edit" href="/theater/${theater._id}/edit">Edit</a>
            </div>
            `: nothing}
            <p class="likes">Likes: 0</p>
        </div>
    </div>
</section>

`;

export const detailsView = (ctx) => {
    theaterService.getOne(ctx.params.theaterId).then(theater => {
        render(detailsTemplate(theater), document.querySelector('#container'));
    })
}