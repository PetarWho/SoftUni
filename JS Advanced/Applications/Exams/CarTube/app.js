import page from "./node_modules/page/page.mjs";
import { carListingsView } from "./views/carListingsView.js";
import { createView } from "./views/createView.js";
import { removeHandler } from "./views/removeHandler.js";
import { detailsView } from "./views/detailsView.js";
import { editView } from "./views/editView.js";
import { homeView } from "./views/homeView.js";
import { loginView } from "./views/loginView.js";
import { logoutHandler } from "./views/logoutHandler.js";
import { registerView } from "./views/registerView.js";
import { myListingsView } from "./views/myListingsView.js";

page('/', homeView);
page('/login', loginView);
page('/logout', logoutHandler);
page('/register', registerView);
page('/listings', carListingsView);
page('/create', createView);
page('myListings', myListingsView)
page('/listings/:listingId', detailsView);
page('/listings/:listingId/edit', editView);
page('/listings/:listingId/remove', removeHandler);

page.start();