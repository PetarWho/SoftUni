import { html, render } from '../node_modules/lit-html/lit-html.js';
import * as petService from '../services/petService.js';

const animalTemplate = (animal) => html`
<div class="animals-board">
    <article class="service-img">
        <img class="animal-image-cover" src="${animal.image}">
    </article>
    <h2 class="name">${animal.name}</h2>
    <h3 class="breed">${animal.breed}</h3>
    <div class="action">
        <a class="btn" href="/pets/${animal._id}">Details</a>
    </div>
</div>
`;

const dashboardTemplate = (pets) => html`
<!--Dashboard-->
<section id="dashboard">
    <h2 class="dashboard-title">Services for every animal</h2>
    <div class="animals-dashboard">
        ${pets.length!=0?html`
        ${pets.map(x=>animalTemplate(x))}
        `:html`
         <!--If there is no pets in dashboard-->
         <div>
            <p class="no-pets">No pets in dashboard</p>
        </div>
        `}
       
    </div>
</section>
`;

export const dashboardView = (ctx) => {
    petService.getAll().then(pets=>{
        render(dashboardTemplate(pets), document.querySelector('#content'));
    })
}