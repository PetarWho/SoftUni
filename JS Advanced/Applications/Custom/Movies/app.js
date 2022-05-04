import page from "./node_modules/page/page.mjs";

import { navigationMiddleware } from "./middlewares/navigationMiddleware.js";
import { loginView } from "./views/loginView.js";
import { registerView } from "./views/registerView.js";
import { catalogView } from "./views/catalogView.js";
import { homeView } from "./views/homeView.js";
import { createView } from "./views/createView.js";
import { detailsView } from "./views/detailsView.js";
import { editView } from "./views/editView.js";
import { searchView } from "./views/searchView.js";
import { watchView } from "./views/watchView.js";
import { notFoundView } from "./views/notFoundView.js";


page(navigationMiddleware);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/movies', catalogView);
page('/create', createView);
page('/search', searchView);
page('/movies/:movieId', detailsView);
page('/movies/:movieId/edit', editView);
page('/watch/:movieId', watchView);
page('*', notFoundView);

page.start();