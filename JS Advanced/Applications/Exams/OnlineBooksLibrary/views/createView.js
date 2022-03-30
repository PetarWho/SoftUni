import { html, render } from "../node_modules/lit-html/lit-html.js";
import * as authService from '../services/authService.js';
import * as bookService from '../services/bookService.js';

const createTemplate = (createHandler) => html`
<!-- Create Page ( Only for logged-in users ) -->
<section id="create-page" class="create">
            <form @submit= ${createHandler} id="create-form" action="" method="">
                <fieldset>
                    <legend>Add new Book</legend>
                    <p class="field">
                        <label for="title">Title</label>
                        <span class="input">
                            <input type="text" name="title" id="title" placeholder="Title">
                        </span>
                    </p>
                    <p class="field">
                        <label for="description">Description</label>
                        <span class="input">
                            <textarea name="description" id="description" placeholder="Description"></textarea>
                        </span>
                    </p>
                    <p class="field">
                        <label for="image">Image</label>
                        <span class="input">
                            <input type="text" name="imageUrl" id="image" placeholder="Image">
                        </span>
                    </p>
                    <p class="field">
                        <label for="type">Type</label>
                        <span class="input">
                            <select id="type" name="type">
                                <option value="Fiction">Fiction</option>
                                <option value="Romance">Romance</option>
                                <option value="Mistery">Mistery</option>
                                <option value="Classic">Clasic</option>
                                <option value="Other">Other</option>
                            </select>
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Add Book">
                </fieldset>
            </form>
        </section>
`;

const isInvalid = (formData)=>{
    const requiredFields = ['title','description','imageUrl','type'];
    return requiredFields.some(x=>!formData[x])
}

export const createView = (ctx) => {
    const createHandler = (e) =>{
        e.preventDefault();
        let formData = Object.fromEntries(new FormData(e.currentTarget));
        let {title, description, imageUrl, type} = formData;

        if(isInvalid(formData)) return;

        bookService.create({title, description, imageUrl, type}).then(res=>ctx.page.redirect('/'));
    }
    render(createTemplate(createHandler), document.querySelector('#container'));
}