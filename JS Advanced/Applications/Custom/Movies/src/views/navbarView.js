import { render } from "../../node_modules/lit-html/lit-html.js";
import { navbarTemplate } from "../templates/navbarTemplate.js";

export const navbarView = (ctx, next) => {
    render(navbarTemplate(), document.querySelector('#navigation'));

    next();
}