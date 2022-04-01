import page from './node_modules/page/page.mjs';

import { navigationMiddleware } from './middlewares/navigationMiddleware.js';
import { homeView } from './views/homeView.js';
import { loginView } from './views/loginView.js';
import { registerView } from './views/registerView.js';
import { logoutHandler } from './views/logoutHandler.js';
import { createView } from './views/createView.js';
import { allMemesView } from './views/allMemesView.js';
import { detailsView } from './views/detailsView.js';
import { editView } from './views/editView.js';
import { profileView } from './views/profileView.js';

page(navigationMiddleware);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutHandler);
page('/create', createView);
page('/memes', allMemesView);
page('/memes/:memeId', detailsView);
page('/memes/:memeId/edit', editView);
page('/profile', profileView);


page.start();