import { html, render } from "../node_modules/lit-html/lit-html.js";
import * as itemService from "../services/itemService.js";

const itemTemplate = (post) => html`
<div class="post">
    <h2 class="post-title">${post.title}</h2>
    <img class="post-image" src="${post.imageUrl}" alt="Material Image">
    <div class="btn-wrapper">
        <a href="/posts/${post._id}" class="details-btn btn">Details</a>
    </div>
</div>
`;

const dashboardTemplate = (posts) => html`
<!-- Dashboard -->
<section id="dashboard-page">
    <h1 class="title">All Posts</h1>

    <!-- Display a div with information about every post (if any)-->
    ${posts.length != 0 ? html`
    <div class="all-posts">
        ${posts.map(x => itemTemplate(x))}
    </div>
    `: html`
    <!-- Display an h1 if there are no posts -->
    <h1 class="title no-posts-title">No posts yet!</h1>
    `}
</section>
`;

export const dashboardView = (ctx) => {
    itemService.getAll().then(posts => {
        render(dashboardTemplate(posts), document.querySelector('#box'));
    })
}