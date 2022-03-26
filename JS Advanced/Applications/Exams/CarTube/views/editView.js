import { html, render } from "../node_modules/lit-html/lit-html.js";
import * as listingsService from "../services/listingsService.js";

const editTemplate = (editHandler) => html`
 <!-- Edit Listing Page -->
 <section id="edit-listing">
            <div class="container">

                <form @submit =${editHandler} id="edit-form">
                    <h1>Edit Car Listing</h1>
                    <p>Please fill in this form to edit an listing.</p>
                    <hr>

                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand" value="">

                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model" value="">

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description" value="">

                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year" value="">

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl" value="">

                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price" value="">

                    <hr>
                    <input type="submit" class="registerbtn" value="Edit Listing">
                </form>
            </div>
        </section>
`;

const listingIsInvalid = (formData)=>{
    const requiredFields = ['brand','model','description','year','imageUrl','price'];
    return requiredFields.some(x=>!formData[x])
}

export const editView = (ctx) => {
    const editHandler = (e) => {
        e.preventDefault();

        let formData = Object.fromEntries(new FormData(e.currentTarget));
        let { brand,model,description,year,imageUrl,price } = formData;

        if(listingIsInvalid(formData) || formData['year']<0 || formData['price'] <0) return;

        listingsService.edit({brand,model,description,year,imageUrl,price}, ctx.params.listingId).then(res=>{ctx.page.redirect(`/listings/${ctx.params.listingId}`)});
    }
    render(editTemplate(editHandler), document.querySelector('#container'));
}