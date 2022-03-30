import * as gameService from "../Services/gameService.js";

export const deleteHandler = (ctx) => {
    try {
        gameService.getOne(ctx.params.gameId).then(game=>
            {
                let isConfirmed = confirm(`Do you want to delete ${game.title} from the list?`)
                if (isConfirmed)
                gameService.remove(game._id).then(res => ctx.page.redirect('/'));
                else ctx.page.redirect(`/catalogue/${game._id}`)
            })
    }
    catch (err) {
        alert(err);
    }
}