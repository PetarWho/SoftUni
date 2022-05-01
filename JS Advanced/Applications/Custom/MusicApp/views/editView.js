import { html, render } from "../node_modules/lit-html/lit-html.js";
import * as movieService from '../services/movieService.js';

const editTemplate = (album) => html`
<!--Edit Page-->
<section class="editPage">
    <form id=${album._id} @submit = ${movieService.edit} autocomplete="off">
        <fieldset>
            <legend>Edit Movie</legend>

            <div class="container">
                <label for="name" class="vhide">Movie Name</label>
                <input id="name" name="name" class="name" type="text" value="${album.name}">

                <label for="imgUrl" class="vhide">Image Url</label>
                <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" value="${album.imgUrl}">

                <label for="releaseDate" class="vhide">Release date</label>
                <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" value="${album.releaseDate}">

                <label for="mainActor" class="vhide">Main Actor</label>
                <input id="mainActor" name="mainActor" class="mainActor" type="text" value="${album.mainActor}">

                <label for="genre" class="vhide">Genre</label>
                <input id="genre" name="genre" class="genre" type="text" value="${album.genre}">

                <label for="description" class="vhide">Description</label>
                <textarea name="description" class="description" rows="10"
                    cols="10">${album.description}</textarea>

                <button class="edit-album" type="submit">Save</button>
                <button class="reset-form" type="reset">Reset</button>
            </div>
        </fieldset>
    </form>
</section>
`;

export const editView = (ctx) => {
    movieService.getOne(ctx.params.albumId).then(album=>{
        render(editTemplate(album), document.querySelector('#box'));
        });
}