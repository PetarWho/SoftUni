import page from '../node_modules/page/page.mjs';

import { navigationMiddleware } from '../middlewares/navigationMiddleware.js';
import { footerMiddleware } from '../middlewares/footerMiddleware.js';
import { loginView } from '../views/loginView.js';
import { registerView } from '../views/registerView.js';
import { logoutHandler } from '../views/logoutHandler.js';
import { createView } from '../views/createView.js';
import { homeView } from '../views/homeView.js';
import { detailsView } from '../views/detailsView.js';
import { editView } from '../views/editView.js';
import { deleteHandler } from '../views/deleteHandler.js';
import { myBooksView } from '../views/myBooksView.js';
import { likeHandler } from '../views/likeHandler.js';

page(navigationMiddleware);
page(footerMiddleware);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutHandler);
page('/create', createView);
page('/books', myBooksView)
page('/books/:bookId', detailsView)
page('/books/:bookId/edit', editView)
page('/books/:bookId/delete', deleteHandler)
page('/books/:bookId/like', likeHandler)

page.start();