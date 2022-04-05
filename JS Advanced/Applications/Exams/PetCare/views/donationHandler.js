import * as donationService from '../services/donationService.js';

export const donateHandler = (ctx)=>donationService.donate(ctx.params.petId).then(ctx.page.redirect(`/pets/${ctx.params.petId}`));