import { html, render, nothing } from "../node_modules/lit-html/lit-html.js";
import * as bookService from '../services/bookService.js';

const editTemplate = (editHandler, book) => html`
    <!-- Edit Page ( Only for the creator )-->
    <section id="edit-page" class="edit">
            <form @submit=${editHandler} id="edit-form" action="#" method="">
                <fieldset>
                    <legend>Edit my Book</legend>
                    <p class="field">
                        <label for="title">Title</label>
                        <span class="input">
                            <input type="text" name="title" id="title" value="${book.title}">
                        </span>
                    </p>
                    <p class="field">
                        <label for="description">Description</label>
                        <span class="input">
                            <textarea name="description"
                                id="description">${book.description}</textarea>
                        </span>
                    </p>
                    <p class="field">
                        <label for="image">Image</label>
                        <span class="input">
                            <input type="text" name="imageUrl" id="image" value="${book.imageUrl}">
                        </span>
                    </p>
                    <p class="field">
                        <label for="type">Type</label>
                        <span class="input">
                            <select id="type" name="type" value="Fiction">
                                <option value="Fiction" selected>Fiction</option>
                                <option value="Romance">Romance</option>
                                <option value="Mistery">Mistery</option>
                                <option value="Classic">Clasic</option>
                                <option value="Other">Other</option>
                            </select>
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Save">
                </fieldset>
            </form>
        </section>
`;

const isInvalid = (formData)=>{
    const requiredFields = ['title','description','imageUrl','type'];
    return requiredFields.some(x=>!formData[x])
}

export const editView = async (ctx) =>{
    let book = await bookService.getOne(ctx.params.bookId);
    const editHandler = (e) =>{
        e.preventDefault();
        let formData = Object.fromEntries(new FormData(e.currentTarget));
        let {title, description, imageUrl, type} = formData;

        if(isInvalid(formData)) return;

        bookService.edit({title, description, imageUrl, type}, book._id).then(res=>ctx.page.redirect(`/books/${book._id}`));
    }

    render(editTemplate(editHandler,book), document.querySelector('#container'));
}