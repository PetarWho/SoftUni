import { html, render } from "../node_modules/lit-html/lit-html.js"
import * as movieService from "../services/movieService.js";

const createTemplate = () => html`
<!--Create Page-->
<section class="createPage">
    <form @submit = ${movieService.create} autocomplete="off">
        <fieldset>
            <legend>Add Movie</legend>

            <div class="container">
                <label for="name" class="vhide">Movie name</label>
                <input id="name" name="name" class="name" type="text" placeholder="Movie name">

                <label for="imgUrl" class="vhide">Image Url</label>
                <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" placeholder="Image Url">

                <label for="releaseDate" class="vhide">Release date</label>
                <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" placeholder="Release date">

                <label for="mainActor" class="vhide">Main Actor</label>
                <input id="mainActor" name="mainActor" class="mainActor" type="text" placeholder="Main Actor">

                <label for="genre" class="vhide">Genre</label>
                <input id="genre" name="genre" class="genre" type="text" placeholder="Genre">

                <label for="description" class="vhide">Description</label>
                <textarea name="description" class="description" placeholder="Description"></textarea>

                <button class="add-album" type="submit">Add New Movie</button>
                <button class="reset-form" type="reset">Reset</button>
            </div>
        </fieldset>
    </form>
</section>
`;

export const createView = (ctx) =>{
    render(createTemplate(), document.querySelector('#box'));
}