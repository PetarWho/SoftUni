import { html, render, nothing } from "../node_modules/lit-html/lit-html.js";
import { isAuthenticated } from "../services/authService.js";
import * as memeService from "../services/memeService.js";

const memeTemplate = (meme) => html`
<!-- Display : All created memes by this user (If any) -->
<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src="${meme.imageUrl}">
    <a class="button" href="/memes/${meme._id}">Details</a>
</div>
`;
let setProfilePic = (gender) => {
    if (gender === 'male') return "../images/male.png";
    else return "../images/female.png";
}

let userInfo = (user, count) => {
    return html`
<div class="user-content">
    <p>Username: ${user.username}</p>
    <p>Email: ${user.email}</p>
    <p>My memes count: ${count}</p>
</div>
    `;
}

const profileTemplate = (memes, user) => html`
<!-- Profile Page ( Only for logged users ) -->
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="${setProfilePic(user.gender)}">
        ${userInfo(user, memes.length)}
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        ${showAllMemes(memes)}
    </div>
</section>
`;

const showAllMemes = (memes) => {
    if (memes.length > 0) {
        return memes.map((x) => memeTemplate(x))
    } else {
        return html`
        <!-- Display : If user doesn't have own memes  -->
        <p class="no-memes">No memes in database.</p>
        `
    }
}

export const profileView = async (ctx) => {
    let user = JSON.parse(sessionStorage.user);
    let memes = await memeService.getPersonalMemes(user._id);
    render(profileTemplate(memes, user), document.querySelector('#container'));
}