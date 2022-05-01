import page from "../node_modules/page/page.mjs";

import { navbarView } from "./views/navbarView.js";
import { homeView } from "./views/homeView.js";
import { loginView } from "./views/loginView.js";
import { logoutHandler } from "./views/logoutHandler.js";
import { registerView } from "./views/registerView.js";
import { singleMovieView } from "./views/singleMovieView.js";



page(navbarView);

page('/', homeView);
page('/register', registerView);
page('/login', loginView);
page('/logout', logoutHandler);
page('/movies/:movieId', singleMovieView)

page.start();