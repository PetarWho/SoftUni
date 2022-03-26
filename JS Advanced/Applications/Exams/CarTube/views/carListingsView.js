import { html, render } from "../node_modules/lit-html/lit-html.js";
import * as listingsService from "../services/listingsService.js";

const carListingTemplate = (listings) => html`
    <section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings"></div>
        ${listings.map(x => singleListingTemplate(x))}
        </div>
</section>
`;

const singleListingTemplate = (listing) => html`
<!-- All Listings Page -->
        ${listing ?
            html`
        <!-- Display all records -->
        <div class="listing">
            <div class="preview">
                <img src="${listing.imageUrl}">
            </div>
            <h2>${listing.brand} ${listing.model}</h2>
            <div class="info">
                <div class="data-info">
                    <h3>Year: ${listing.year}</h3>
                    <h3>Price: ${listing.price} $</h3>
                </div>
                <div class="data-buttons">
                    <a href="/listings/${listing._id}" class="button-carDetails">Details</a>
                </div>
            </div>
        </div>
        `
        : html`
        <!-- Display if there are no records -->
        <p class="no-cars">No cars in database.</p>
        `
        }
`;

export const carListingsView = (ctx) => {
    listingsService.getAll().then(listings => render(carListingTemplate(listings), document.querySelector('#container')));

}