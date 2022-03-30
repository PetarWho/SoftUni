import { html, render, nothing } from "../node_modules/lit-html/lit-html.js";
import * as gameService from "../Services/gameService.js";
import * as commentService from "../Services/commentService.js";
import { isAuthenticated } from "../Services/authService.js";

const isOwnerOfGame = (gameOwnerId) => {
    return gameOwnerId == localStorage.getItem('_id');
}

const commentTemplate = (comment) => html`
<li class="comment">
    <p>Content: ${comment.content}</p>
</li>
`;

const displayButtons= (ownerId) =>{
    return (isOwnerOfGame(ownerId) && isAuthenticated())
}

const detailsTemplate = (game, comments, commentHandler) => html`
    <!--Details Page-->
    <section id="game-details">
        <h1>Game Details</h1>
        <div class="info-section">
    
            <div class="game-header">
                <img class="game-img" src="${game.imageUrl}" />
                <h1>${game.title}</h1>
                <span class="levels">MaxLevel: ${game.maxLevel}</span>
                <p class="type">${game.category}</p>
            </div>
    
            <p class="text">
                ${game.summary}
            </p>
    
            <!-- Bonus ( for Guests and Users ) -->
            <div class="details-comments">
                <h2>Comments:</h2>
                ${comments.length!=0 ? html`<ul>
                    <!-- list all comments for current game (If any) -->
                    ${comments.map(x=>commentTemplate(x))}
                </ul>`: html`
                <!-- Display paragraph: If there are no games in the database -->
                <p class="no-comment">No comments.</p>`}
            </div>
    
            ${displayButtons(game._ownerId) ? html`
            <!-- Edit/Delete buttons ( Only for creator of this game )  -->
            <div class="buttons">
                <a href="/catalogue/${game._id}/edit" class="button">Edit</a>
                <a href="/catalogue/${game._id}/delete" class="button">Delete</a>
            </div>`: nothing}
    
        </div>
    
        <!-- Bonus -->
        <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
        ${isAuthenticated()?html`
        <article class="create-comment">
            <label>Add new comment:</label>
            <form @submit = ${commentHandler} class="form">
                <textarea name="comment" placeholder="Comment......"></textarea>
                <input class="btn submit" type="submit" value="Add Comment">
            </form>
        </article>
        `:nothing}
    </section>
`;

export const detailsView = (ctx) => {
    const commentHandler = (e) => {
        e.preventDefault();

        let formData = Object.fromEntries(new FormData(e.currentTarget));
        let { comment } = formData;
        let commentArea = e.currentTarget.parentNode.children[1].children[0];
        if(!(comment.trim())) {
            commentArea.value='';
            return;
        }

        let currentGameId = ctx.params.gameId;
        console.log(currentGameId);
        
        commentService.create({currentGameId ,comment}).then(res=>{
            commentArea.value='';
            ctx.page.redirect(`/catalogue/${currentGameId}`)});
    }

    gameService.getOne(ctx.params.gameId)
        .then(game => {
            commentService.getAll(game._id).then(comments =>{
                render(detailsTemplate(game, comments, commentHandler), document.querySelector('#box'));
            })
        })
}