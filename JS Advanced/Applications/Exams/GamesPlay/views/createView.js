import { html, render } from "../node_modules/lit-html/lit-html.js";
import * as gameService from "../Services/gameService.js";

const createTemplate = (createHandler) => html`
    <!-- Create Page ( Only for logged-in users ) -->
    <section id="create-page" class="auth">
        <form @submit =${createHandler} id="create">
            <div class="container">
    
                <h1>Create Game</h1>
                <label for="leg-title">Legendary title:</label>
                <input type="text" id="title" name="title" placeholder="Enter game title...">
    
                <label for="category">Category:</label>
                <input type="text" id="category" name="category" placeholder="Enter game category...">
    
                <label for="levels">MaxLevel:</label>
                <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">
    
                <label for="game-img">Image:</label>
                <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">
    
                <label for="summary">Summary:</label>
                <textarea name="summary" id="summary"></textarea>
                <input class="btn submit" type="submit" value="Create Game">
            </div>
        </form>
    </section>
`;

const inputNotFilled = (formData)=>{
    const requiredFields = ['title','category','maxLevel','imageUrl','summary'];
    return requiredFields.some(x=>!formData[x])
}

export const createView = (ctx) => {
    const createHandler = (e) => {
        e.preventDefault();

        let formData = Object.fromEntries(new FormData(e.currentTarget));
        let { title,category,maxLevel, imageUrl,summary } = formData;

        if(inputNotFilled(formData)) return;

        gameService.create({title,category,maxLevel,imageUrl,summary}).then(res=>{ctx.page.redirect('/')});
    }

    render(createTemplate(createHandler), document.querySelector('#box'))
}