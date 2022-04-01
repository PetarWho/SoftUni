import { html, render } from "../node_modules/lit-html/lit-html.js";
import * as memeService from "../services/memeService.js";

const editTemplate = (meme) => html`
<!-- Edit Meme Page ( Only for logged user and creator to this meme )-->
<section id="edit-meme">
    <form @submit=${memeService.editMeme} id="edit-form" class=${meme._id}>
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" value = ${meme.title} name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description">${meme.description}</textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" value = ${meme.imageUrl} name="imageUrl">
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>
`;

export const editView = (ctx) => {
    memeService.getOneMeme(ctx.params.memeId).then( meme =>{
        render(editTemplate(meme), document.querySelector('#container'))
    })
}