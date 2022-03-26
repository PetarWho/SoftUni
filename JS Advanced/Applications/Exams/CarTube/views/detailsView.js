import { html, render, nothing } from "../node_modules/lit-html/lit-html.js";
import * as listingsService from "../services/listingsService.js";

const isOwnerOfListing = (listingOwnerId) => {
    return listingOwnerId == localStorage.getItem('_id');
}

const detailsTemplate = (listing) => html`
    <!-- Listing Details Page -->
    <section id="listing-details">
        <h1>Details</h1>
        <div class="details-info">
            <img src="${listing.imageUrl}">
            <hr>
            <ul class="listing-props">
                <li><span>Brand:</span>${listing.brand}</li>
                <li><span>Model:</span>${listing.model}</li>
                <li><span>Year:</span>${listing.year}</li>
                <li><span>Price:</span>${listing.price}$</li>
            </ul>
    
            <p class="description-para">${listing.description}</p>
            ${isOwnerOfListing(listing._ownerId)? html`
            <div class="listings-buttons">
                <a href="${listing._id}/edit" class="button-list">Edit</a>
                <a href="${listing._id}/remove" class="button-list">Delete</a>
            </div>`: nothing
        }
        </div>
    </section>
`;

export const detailsView = (ctx) => {
    listingsService.getOne(ctx.params.listingId)
        .then(listing => {
            render(detailsTemplate(listing), document.querySelector('#container'));
        })
}