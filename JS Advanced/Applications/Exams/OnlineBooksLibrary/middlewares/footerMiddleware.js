import { html, render } from "../node_modules/lit-html/lit-html.js";

const footerTemplate = () => html`
<footer id="site-footer">
    <p>@OnlineBooksLibrary</p>
</footer>
`;

export const footerMiddleware = (ctx, next) => {
    render(footerTemplate(), document.querySelector('#footer'));
    next();
}