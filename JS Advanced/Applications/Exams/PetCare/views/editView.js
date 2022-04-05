import { html, render } from '../node_modules/lit-html/lit-html.js';
import * as petService from '../services/petService.js';

const editTemplate = (pet) => html`
<!--Edit Page-->
<section id="editPage">
    <form id=${pet._id} @submit=${petService.edit} class="editForm">
        <img src="${pet.image}">
        <div>
            <h2>Edit PetPal</h2>
            <div class="name">
                <label for="name">Name:</label>
                <input name="name" id="name" type="text" value="${pet.name}">
            </div>
            <div class="breed">
                <label for="breed">Breed:</label>
                <input name="breed" id="breed" type="text" value="${pet.breed}">
            </div>
            <div class="Age">
                <label for="age">Age:</label>
                <input name="age" id="age" type="text" value="${pet.age}">
            </div>
            <div class="weight">
                <label for="weight">Weight:</label>
                <input name="weight" id="weight" type="text" value="${pet.weight}">
            </div>
            <div class="image">
                <label for="image">Image:</label>
                <input name="image" id="image" type="text" value="${pet.image}">
            </div>
            <button class="btn" type="submit">Edit Pet</button>
        </div>
    </form>
</section>
`;

export const editView = (ctx) => {
    petService.getOne(ctx.params.petId).then(pet=>{
        render(editTemplate(pet), document.querySelector('#content'));
    })
} 