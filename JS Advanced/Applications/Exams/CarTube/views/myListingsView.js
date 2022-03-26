import { html, render } from "../node_modules/lit-html/lit-html.js";
import * as listingsService from "../services/listingsService.js";

const singleListingTemplate = (listing) => html`
    ${listing?
    html`<!-- Display all records -->
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
        </div>`
        :html`<!-- Display if there are no records -->
        <p class="no-cars"> You haven't listed any cars yet.</p>
    `}
`;

const myListingsTemplate = (listings) => html`
<!-- My Listings Page -->
<section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">
        ${listings.map(x => singleListingTemplate(x))}
    </div>
</section>
`;

export const myListingsView = (ctx) => {
    listingsService.getMyListings(localStorage.getItem('_id')).then(listings=>{
        render(myListingsTemplate(listings), document.querySelector('#container'));
    })
}