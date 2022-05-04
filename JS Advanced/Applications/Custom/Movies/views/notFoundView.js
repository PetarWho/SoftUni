import { html, render, nothing } from "../node_modules/lit-html/lit-html.js";

const notFoundTemplate = () => html`
<section class="content">
    <h1 class="h1-text">Page Not Found</h1>
</section>
`;

export const notFoundView = (ctx) => {
    render(notFoundTemplate(), document.querySelector('#box'));
}