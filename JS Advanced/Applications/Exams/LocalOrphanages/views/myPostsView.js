import { html, render, nothing } from "../node_modules/lit-html/lit-html.js";
import { isAuthenticated } from "../services/authService.js";
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

const myPostsTemplate = (posts) => html`
        <!-- My Posts -->
        <section id="my-posts-page">
            <h1 class="title">My Posts</h1>
        
            ${posts.length != 0 ? html`
            <!-- Display a div with information about every post (if any)-->
            <div class="my-posts">
                ${posts.map(x => itemTemplate(x))}  
            </div>
            `: html`
            <!-- Display an h1 if there are no posts -->
            <h1 class="title no-posts-title">You have no posts yet!</h1>
            `}
        </section>
`;

export const myPostsView = (ctx) =>{
    let user = JSON.parse(sessionStorage.user);
    itemService.getMyPosts(user._id).then(posts=>{
        render(myPostsTemplate(posts), document.querySelector('#box'));
    })
}