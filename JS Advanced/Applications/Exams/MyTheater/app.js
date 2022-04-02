import page from "./node_modules/page/page.mjs";
import { navigationMiddleware } from "./middlewares/navigationMiddleware.js";
import { loginView } from "./views/loginView.js";
import { registerView } from "./views/registerView.js";
import { homeView } from "./views/homeView.js";
import { createView } from "./views/createView.js";
import { detailsView } from "./views/detailsView.js";
import { editView } from "./views/editView.js";
import { profileView } from "./views/profileView.js";

page(navigationMiddleware);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/create', createView);
page('/theater/:theaterId', detailsView);
page('/theater/:theaterId/edit', editView);
page('/profile', profileView);

page.start();