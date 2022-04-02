import { html, render } from '../node_modules/lit-html/lit-html.js'
import * as theaterService from '../services/theaterService.js';

const eventTemplate = (event) => html`
<!--If there are event-->
<div class="eventBoard">
    <div class="event-info">
        <img src="${event.imageUrl}">
        <h2>${event.title}</h2>
        <h6>${event.date}</h6>
        <a href="/theater/${event._id}" class="details-button">Details</a>
    </div>
</div>
`;

const profileTemplate = (events, user) => html`
<!--Profile Page-->
<section id="profilePage">
    <div class="userInfo">
        <div class="avatar">
            <img src="./images/profilePic.png">
        </div>
        <h2>${user.email}</h2>
    </div>
    <div class="board">
        ${events.length != 0 ? html`
        ${events.map(x => eventTemplate(x))}
        `: html`
        <!--If there are no event-->
        <div class="no-events">
            <p>This user has no events yet!</p>
        </div>`
    }
    </div>
</section>
`;

export const profileView = (ctx) => {
    let user = JSON.parse(sessionStorage.user);
    theaterService.getPersonal(user._id).then(events=>{
        render(profileTemplate(events, user), document.querySelector('#container'));
    });
}