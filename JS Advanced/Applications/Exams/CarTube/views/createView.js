import { html, render } from "../node_modules/lit-html/lit-html.js";
import * as listingsService from "../services/listingsService.js";

const createTemplate = (createHandler) =>html`
    <!-- Create Listing Page -->
    <section id="create-listing">
            <div class="container">
                <form @submit=${createHandler} id="create-form">
                    <h1>Create Car Listing</h1>
                    <p>Please fill in this form to create an listing.</p>
                    <hr>

                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand">

                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model">

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description">

                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year">

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl">

                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price">

                    <hr>
                    <input type="submit" class="registerbtn" value="Create Listing">
                </form>
            </div>
        </section>
`;

const listingIsInvalid = (formData)=>{
    const requiredFields = ['brand','model','description','year','imageUrl','price'];
    return requiredFields.some(x=>!formData[x])
}

export const createView = (ctx) => {
    const createHandler = (e) => {
        e.preventDefault();

        let formData = Object.fromEntries(new FormData(e.currentTarget));
        let { brand,model,description,year,imageUrl,price } = formData;

        if(listingIsInvalid(formData) || formData['year']<0 || formData['price'] <0) return;

        listingsService.create({brand,model,description,year,imageUrl,price}).then(res=>{ctx.page.redirect('/listings')});
    }

    render(createTemplate(createHandler), document.querySelector('#container'));
}