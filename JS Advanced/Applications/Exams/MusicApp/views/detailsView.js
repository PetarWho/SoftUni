import { html, render, nothing } from "../node_modules/lit-html/lit-html.js";
import { isAuthenticated } from "../services/authService.js";
import * as musicService from '../services/musicService.js';

const isOwner = (albumOwner) => {
    if (isAuthenticated()) {
        let user = JSON.parse(sessionStorage.user);
        if (user._id == albumOwner) return true;
    }
    return false;
}

const detailsTemplate = (album) => html`
<!--Details Page-->
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src="${album.imgUrl}">
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${album.name}</h1>
                <h3>Artist: ${album.artist}</h3>
                <h4>Genre: ${album.genre}</h4>
                <h4>Price: $${album.price}</h4>
                <h4>Date: ${album.releaseDate}</h4>
                <p>Description: ${album.description}</p>
            </div>

            ${isOwner(album._ownerId) ? html`
            <!-- Only for registered user and creator of the album-->
            <div class="actionBtn">
                <a id=${album._id} href="/albums/${album._id}/edit" class="edit">Edit</a>
                <a id=${album._id} @click=${musicService.deleteAlbum} href="javascript:void(0)" class="remove">Delete</a>
            </div>`: nothing}
        </div>
    </div>
</section>
`;

export const detailsView = (ctx) => {
    musicService.getOne(ctx.params.albumId).then(album=>{
        render(detailsTemplate(album), document.querySelector('#box'));
    });
}