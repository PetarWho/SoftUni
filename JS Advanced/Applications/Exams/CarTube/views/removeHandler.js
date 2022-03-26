import * as listingsService from "../services/listingsService.js";

export const removeHandler = async (ctx) => {
    try {
        let listing = await listingsService.getOne(ctx.params.listingId);
        console.log(listing);

        let isConfirmed = confirm(`Do you want to delete ${listing.brand} ${listing.model} from the listings?`);
        if (isConfirmed) {
            await listingsService.remove(listing._id);
            ctx.page.redirect('/listings');
        }
    }
    catch (err) {
        alert(err);
    }

}