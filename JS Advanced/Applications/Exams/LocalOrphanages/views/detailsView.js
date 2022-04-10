import { html, render, nothing } from "../node_modules/lit-html/lit-html.js";
import { isAuthenticated } from "../services/authService.js";
import * as itemService from "../services/itemService.js";
import * as donationService from "../services/donationService.js";

const isOwner = (post) => {
    if (sessionStorage.user) {
        let user = JSON.parse(sessionStorage.user);
        return Boolean(post._ownerId == user._id)
    }
    return false;
}

const detailsTemplate = (post, count, personalCount) => html`
<!-- Details Page -->
<section id="details-page">
    <h1 class="title">Post Details</h1>

    <div id="container">
        <div id="details">
            <div class="image-wrapper">
                <img src="${post.imageUrl}" alt="Material Image" class="post-image">
            </div>
            <div class="info">
                <h2 class="title post-title">${post.title}</h2>
                <p class="post-description">Description: ${post.description}</p>
                <p class="post-address">Address: ${post.address}</p>
                <p class="post-number">Phone number: ${post.phone}</p>
                <p class="donate-Item">Donate Materials: ${count}</p>

                ${isOwner(post) ? html`
                <!--Edit and Delete are only for creator-->
                <div class="btns">
                    <a href="/posts/${post._id}/edit" class="edit-btn btn">Edit</a>
                    <a @click=${itemService.deletePost} id=${post._id} href="javascript:void(0)" class="delete-btn btn">Delete</a>
                </div>`: nothing}
                ${isAuthenticated() && !isOwner(post) &&personalCount==0 ? html`
                <!--Bonus - Only for logged-in users ( not authors )-->
                <a href="/posts/${post._id}/donate" class="donate-btn btn">Donate</a>
                `: nothing}
            </div>
        </div>
    </div>
</section>
`;

export const detailsView = async(ctx) =>{
    let count = await donationService.getForPost(ctx.params.postId);

    let personalCount = 0;

    if (sessionStorage.user) {
        personalCount = await donationService.getFromSpecificUser(ctx.params.postId, JSON.parse(sessionStorage.user)._id);
    }

    itemService.getOne(ctx.params.postId).then(post=>{
        render(detailsTemplate(post, count, personalCount),document.querySelector('#box'));
    })
}