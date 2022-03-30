import { html, render } from "../node_modules/lit-html/lit-html.js";
import * as gameService from "../Services/gameService.js";

const editTemplate = (editHandler, game) => html`
<!-- Edit Page ( Only for the creator )-->
<section id="edit-page" class="auth">
    <form @submit=${editHandler} id="edit">
        <div class="container">

            <h1>Edit Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" value="${game.title}">

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" value="${game.category}">

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" value="${game.maxLevel}">

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" value="${game.imageUrl}">

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary">${game.summary}</textarea>
            <input class="btn submit" type="submit" value="Edit Game">

        </div>
    </form>
</section>
`;

const inputNotFilled = (formData) => {
    const requiredFields = ['title', 'category', 'maxLevel', 'imageUrl', 'summary'];
    return requiredFields.some(x => !formData[x])
}

export const editView = (ctx) => {
    const editHandler = (e) => {
        e.preventDefault();

        let formData = Object.fromEntries(new FormData(e.currentTarget));
        let { title, category, maxLevel, imageUrl, summary } = formData;

        if (inputNotFilled(formData)) return;

        gameService.edit({ title, category, maxLevel, imageUrl, summary }, ctx.params.gameId).then(res => { ctx.page.redirect(`/catalogue/${ctx.params.gameId}`) });
    }

    const renderIt = () => 
        gameService.getOne(ctx.params.gameId).then(game =>
            render(editTemplate(editHandler, game), document.querySelector('#box'))
            );

    renderIt();
}