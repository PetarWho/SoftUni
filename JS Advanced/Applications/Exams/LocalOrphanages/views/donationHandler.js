import * as donationService from '../services/donationService.js';

export const donateHandler = (ctx)=>donationService.donate(ctx.params.postId).then(ctx.page.redirect(`/posts/${ctx.params.postId}`));