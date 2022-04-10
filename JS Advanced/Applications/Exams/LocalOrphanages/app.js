import { navigationMiddleware } from "./middlewares/navigationMiddleware.js";
import page from "./node_modules/page/page.mjs";
import { createView } from "./views/createView.js";
import { dashboardView } from "./views/dashboardView.js";
import { detailsView } from "./views/detailsView.js";
import { donateHandler } from "./views/donationHandler.js";
import { editView } from "./views/editView.js";
import { loginView } from "./views/loginView.js";
import { myPostsView } from "./views/myPostsView.js";
import { registerView } from "./views/registerView.js";

page(navigationMiddleware);

page('/', dashboardView);
page('/login', loginView);
page('/register', registerView);
page('/create', createView);
page('/posts/:postId', detailsView);
page('/posts/:postId/edit', editView);
page('/posts/:postId/donate', donateHandler);
page('/myPosts', myPostsView)

page.start();