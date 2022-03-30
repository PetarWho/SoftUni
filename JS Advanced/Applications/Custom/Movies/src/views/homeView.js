import { render } from "../../node_modules/lit-html/lit-html.js";
import * as movieService from "../services/movieService.js";
import { homeTemplate } from "../templates/homeTemplate.js";


export const homeView = (ctx, next) => {
    movieService.getAll().then(movies => render(homeTemplate(movies), document.querySelector('#root')));

}