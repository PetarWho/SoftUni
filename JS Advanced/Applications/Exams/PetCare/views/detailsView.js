import { html, render, nothing } from '../node_modules/lit-html/lit-html.js';
import { isAuthenticated } from '../services/authService.js';
import * as petService from '../services/petService.js';
import * as donationService from '../services/donationService.js';

const isOwner = (pet) => {
    if (sessionStorage.user) {
        let user = JSON.parse(sessionStorage.user);
        return Boolean(pet._ownerId == user._id)
    }
    return false;
}

const detailsTemplate = (pet, count, personalCount) => html`
<!--Details Page-->
<section id="detailsPage">
    <div class="details">
        <div class="animalPic">
            <img src="${pet.image}">
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${pet.name}</h1>
                <h3>Breed: ${pet.breed}</h3>
                <h4>Age: ${pet.age}</h4>
                <h4>Weight: ${pet.weight}</h4>
                <h4 class="donation">Donation: ${count}$</h4>
            </div>
            <!-- if there is no registered user, do not display div-->
            ${isAuthenticated() ? html`
            <div class="actionBtn">
                ${isOwner(pet) ? html`
                <!-- Only for registered user and creator of the pets-->
                <a href="/pets/${pet._id}/edit" class="edit">Edit</a>
                <a id=${pet._id} @click=${petService.deletePet} href="javascript:void(0)" class="remove">Delete</a>
                `: html`
                <!--(Bonus Part) Only for no creator and user-->
                ${personalCount == 0 ? html`
                <a href="/pets/${pet._id}/donate" class="donate">Donate</a>`
                : nothing}
                `}
            </div>
            `: nothing}

        </div>
    </div>
</section>
`;

export const detailsView = async (ctx) => {
    let count = await donationService.getForPet(ctx.params.petId) * 100;

    let personalCount = 0;

    if (sessionStorage.user) {
        personalCount = await donationService.getForPetFromPerson(ctx.params.petId, JSON.parse(sessionStorage.user)._id);
    }

    petService.getOne(ctx.params.petId).then(pet => {
        render(detailsTemplate(pet, count, personalCount), document.querySelector('#content'));
    })
}