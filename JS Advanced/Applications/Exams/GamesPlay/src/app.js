import page from "../node_modules/page/page.mjs";
import { navigationMiddleware } from "../middlewares/navigationMiddleware.js";
import { loginView } from "../views/loginView.js";
import { homeView } from "../views/homeView.js";
import { registerView } from "../views/registerView.js";
import { logoutHandler } from "../views/logoutHandler.js";
import { catalogueView } from "../views/catalogueView.js";
import { createView } from "../views/createView.js";
import { detailsView } from "../views/detailsView.js";
import { editView } from "../views/editView.js";
import { deleteHandler } from "../views/deleteHandler.js";


page(navigationMiddleware);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutHandler);
page('/catalogue', catalogueView);
page('/create', createView);
page('/catalogue/:gameId', detailsView);
page('/catalogue/:gameId/edit', editView);
page('/catalogue/:gameId/delete', deleteHandler);

page.start();