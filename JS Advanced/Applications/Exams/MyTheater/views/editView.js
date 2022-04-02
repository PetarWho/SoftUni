import { html, render } from '../node_modules/lit-html/lit-html.js'
import * as theaterService from '../services/theaterService.js';

const editTemplate = (theater) =>html`
<!--Edit Page-->
<section id="editPage">
            <form id = ${theater._id} @submit=${theaterService.edit} class="theater-form">
                <h1>Edit Theater</h1>
                <div>
                    <label for="title">Title:</label>
                    <input id="title" name="title" type="text" placeholder="Theater name" value="${theater.title}">
                </div>
                <div>
                    <label for="date">Date:</label>
                    <input id="date" name="date" type="text" placeholder="Month Day, Year" value="${theater.date}">
                </div>
                <div>
                    <label for="author">Author:</label>
                    <input id="author" name="author" type="text" placeholder="Author"
                        value="${theater.author}">
                </div>
                <div>
                    <label for="description">Theater Description:</label>
                    <textarea id="description" name="description"
                        placeholder="Description">${theater.description}</textarea>
                </div>
                <div>
                    <label for="imageUrl">Image url:</label>
                    <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url"
                        value="${theater.imageUrl}">
                </div>
                <button class="btn" type="submit">Submit</button>
            </form>
        </section>
`;

export const editView = (ctx) => {
    theaterService.getOne(ctx.params.theaterId).then(theater=>{
        render(editTemplate(theater), document.querySelector('#container'));
    })
}